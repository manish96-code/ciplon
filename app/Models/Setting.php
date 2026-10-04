<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    // Mass assignable attributes
    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
        'description',
        'is_public',
    ];

    // Attribute type casting
    protected $casts = [
        'is_public' => 'boolean',
    ];

    // Get a setting value by key with optional default fallback
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();

        if (! $setting) {
            return $default;
        }

        return match ($setting->type) {
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($setting->value, true) ?? $default,
            'integer' => (int) $setting->value,
            default => $setting->value,
        };
    }

    // Set or update a setting value
    public static function set(
        string $key,
        mixed $value,
        string $group = 'general',
        string $type = 'string',
        bool $isPublic = true,
        ?string $description = null
    ): self {
        $storedValue = match ($type) {
            'json' => is_string($value) ? $value : json_encode($value),
            'boolean' => $value ? '1' : '0',
            default => (string) $value,
        };

        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $storedValue,
                'group' => $group,
                'type' => $type,
                'is_public' => $isPublic,
                'description' => $description,
            ]
        );
    }

    // Retrieve all settings grouped by group name as associative key-value pairs
    public static function getAllGrouped(): array
    {
        $settings = static::all();
        $grouped = [];

        foreach ($settings as $setting) {
            $parsedValue = match ($setting->type) {
                'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                'json' => json_decode($setting->value, true),
                'integer' => (int) $setting->value,
                default => $setting->value,
            };

            $grouped[$setting->group][$setting->key] = [
                'value' => $parsedValue,
                'type' => $setting->type,
                'description' => $setting->description,
                'is_public' => $setting->is_public,
            ];
        }

        return $grouped;
    }

    // Retrieve all public settings as a flat key => value map
    public static function getPublicMap(): array
    {
        $settings = static::where('is_public', true)->get();
        $map = [];

        foreach ($settings as $setting) {
            $map[$setting->key] = match ($setting->type) {
                'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                'json' => json_decode($setting->value, true),
                'integer' => (int) $setting->value,
                default => $setting->value,
            };
        }

        return $map;
    }
}
