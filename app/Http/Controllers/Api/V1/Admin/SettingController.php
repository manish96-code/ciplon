<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Setting;
use App\Services\ImageKitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    // Retrieve all settings grouped by category and flat key-value pairs for admin management.
    public function index(): JsonResponse
    {
        $grouped = Setting::getAllGrouped();
        $flat = Setting::getPublicMap();

        // Also include all non-public keys in the admin flat view
        $allSettings = Setting::all();
        foreach ($allSettings as $setting) {
            $flat[$setting->key] = match ($setting->type) {
                'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                'json' => json_decode($setting->value, true),
                'integer' => (int) $setting->value,
                default => $setting->value,
            };
        }

        return response()->json([
            'success' => true,
            'data' => [
                'grouped' => $grouped,
                'settings' => $flat,
            ],
        ]);
    }

    // Update settings in bulk and handle optional logo/image uploads.
    public function update(Request $request, ImageKitService $imageKit): JsonResponse
    {
        $validated = $request->validate([
            'settings' => ['nullable'],
            'logo' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
        ]);

        // Process logo upload exclusively to ImageKit
        if ($request->hasFile('logo')) {
            $uploadData = $imageKit->upload(
                file: $request->file('logo'),
                folder: '/branding'
            );

            $logoSetting = Setting::set(
                key: 'logo_url',
                value: $uploadData['url'],
                group: 'general',
                type: 'image',
                isPublic: true,
                description: 'Official corporate logo'
            );

            // Record in polymorphic images table for tracking
            Image::where('model_type', Setting::class)
                ->where('model_id', $logoSetting->id)
                ->where('collection', 'logo')
                ->delete();

            Image::create([
                'model_type' => Setting::class,
                'model_id' => $logoSetting->id,
                'collection' => 'logo',
                'file_name' => $uploadData['file_name'],
                'file_path' => $uploadData['url'],
                'mime_type' => $uploadData['mime_type'],
                'disk' => 'imagekit',
                'size' => $uploadData['size'],
                'alt_text' => $uploadData['file_id'],
                'sort_order' => 0,
            ]);
        }

        // Parse settings if sent as stringified JSON from multipart/form-data
        $settingsData = $request->input('settings');
        if (is_string($settingsData)) {
            $settingsData = json_decode($settingsData, true) ?? [];
        }

        // If settings array is provided, update each setting
        if (is_array($settingsData)) {
            foreach ($settingsData as $key => $val) {
                // If a new logo file was uploaded in this request, skip overwriting it with stale client state
                if ($request->hasFile('logo') && $key === 'logo_url') {
                    continue;
                }

                // Determine group based on key prefix or existing setting
                $existing = Setting::where('key', $key)->first();
                $group = $existing ? $existing->group : $this->inferGroup($key);
                $type = $existing ? $existing->type : $this->inferType($val);
                $desc = $existing ? $existing->description : null;

                Setting::set(
                    key: $key,
                    value: $val,
                    group: $group,
                    type: $type,
                    isPublic: true,
                    description: $desc
                );
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Business profile and settings updated successfully.',
            'data' => Setting::getPublicMap(),
        ]);
    }

    // Public endpoint for frontend landing page and footer to consume company profile.
    public function publicProfile(): JsonResponse
    {
        $settings = Setting::getPublicMap();

        return response()->json([
            'success' => true,
            'data' => [
                'name' => $settings['company_name'] ?? 'ApexBio Life Sciences',
                'legalName' => $settings['legal_name'] ?? 'ApexBio Pharmaceuticals Ltd.',
                'tagline' => $settings['tagline'] ?? '',
                'description' => $settings['description'] ?? '',
                'foundedYear' => $settings['founded_year'] ?? '2004',
                'logoUrl' => $settings['logo_url'] ?? '',
                'email' => $settings['company_email'] ?? '',
                'enquiriesEmail' => $settings['enquiries_email'] ?? '',
                'phone' => $settings['company_phone'] ?? '',
                'whatsapp' => $settings['whatsapp_number'] ?? '',
                'businessHours' => $settings['business_hours'] ?? '',
                'drugLicenseNo' => $settings['drug_license_no'] ?? '',
                'gstTaxId' => $settings['gst_tax_id'] ?? '',
                'whoGmpCertified' => (bool) ($settings['who_gmp_certified'] ?? false),
                'isoCertification' => $settings['iso_certification'] ?? '',
                'headquarters' => $settings['headquarters_address'] ?? '',
                'city' => $settings['city'] ?? '',
                'state' => $settings['state'] ?? '',
                'postalCode' => $settings['postal_code'] ?? '',
                'country' => $settings['country'] ?? '',
                'manufacturingUnit' => $settings['manufacturing_unit_address'] ?? '',
                'website' => $settings['website_url'] ?? '',
                'linkedin' => $settings['linkedin_url'] ?? '',
                'twitter' => $settings['twitter_url'] ?? '',
            ],
        ]);
    }

    // Infer group name from key name
    protected function inferGroup(string $key): string
    {
        if (str_contains($key, 'email') || str_contains($key, 'phone') || str_contains($key, 'whatsapp') || str_contains($key, 'hours')) {
            return 'contact';
        }
        if (str_contains($key, 'address') || str_contains($key, 'city') || str_contains($key, 'state') || str_contains($key, 'country') || str_contains($key, 'postal')) {
            return 'location';
        }
        if (str_contains($key, 'license') || str_contains($key, 'gst') || str_contains($key, 'gmp') || str_contains($key, 'iso') || str_contains($key, 'tax')) {
            return 'regulatory';
        }
        if (str_contains($key, 'url') || str_contains($key, 'linkedin') || str_contains($key, 'twitter') || str_contains($key, 'facebook')) {
            return 'social';
        }

        return 'general';
    }

    // Infer value type
    protected function inferType(mixed $val): string
    {
        if (is_bool($val)) {
            return 'boolean';
        }
        if (is_array($val)) {
            return 'json';
        }
        if (is_int($val)) {
            return 'integer';
        }

        return 'string';
    }
}
