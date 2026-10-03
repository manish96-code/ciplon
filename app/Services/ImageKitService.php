<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ImageKitService
{
    protected string $privateKey;

    protected string $urlEndpoint;

    public function __construct()
    {
        $this->privateKey = (string) config('services.imagekit.private_key');
        $this->urlEndpoint = (string) config('services.imagekit.url_endpoint');
    }

    // Upload an image file to ImageKit from an UploadedFile instance.
    public function upload(UploadedFile $file, string $folder = '/products', ?string $customFileName = null): array
    {
        $fileName = $customFileName ?: pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME).'_'.time().'.'.$file->getClientOriginalExtension();

        return $this->uploadFromPath(
            filePath: $file->getRealPath(),
            originalFileName: $fileName,
            folder: $folder,
            fileSize: $file->getSize() ?: 0,
            mimeType: $file->getClientMimeType() ?: 'image/jpeg'
        );
    }

    // Upload an image file to ImageKit from a local storage file path.
    public function uploadFromPath(
        string $filePath,
        string $originalFileName,
        string $folder = '/products',
        int $fileSize = 0,
        string $mimeType = 'image/jpeg'
    ): array {
        $extension = pathinfo($originalFileName, PATHINFO_EXTENSION);
        $fileName = pathinfo($originalFileName, PATHINFO_FILENAME).'_'.time().'.'.$extension;
        $content = file_get_contents($filePath);
        $size = $fileSize > 0 ? $fileSize : (filesize($filePath) ?: 0);

        // Disabling SSL verify prevents cURL error 60 on Windows local environments without root CA config
        $response = Http::withoutVerifying()
            ->withBasicAuth($this->privateKey, '')
            ->timeout(60)
            ->attach(
                'file',
                $content,
                $fileName
            )
            ->post('https://upload.imagekit.io/api/v1/files/upload', [
                'fileName' => $fileName,
                'folder' => $folder,
                'useUniqueFileName' => 'true',
            ]);

        if (! $response->successful()) {
            Log::error('ImageKit upload error', [
                'status' => $response->status(),
                'body' => $response->body(),
                'response' => $response->json(),
            ]);

            throw new \RuntimeException($response->json('message') ?? $response->body() ?? 'Failed to upload image to ImageKit.');
        }

        $data = $response->json();

        return [
            'file_id' => $data['fileId'] ?? '',
            'url' => $data['url'] ?? '',
            'file_name' => $data['name'] ?? $fileName,
            'file_path' => $data['url'] ?? $data['filePath'] ?? '',
            'size' => $data['size'] ?? $size,
            'mime_type' => $mimeType,
        ];
    }

    // Delete a file from ImageKit by fileId.
    public function delete(string $fileId): bool
    {
        if (empty($fileId)) {
            return false;
        }

        try {
            $response = Http::withoutVerifying()
                ->withBasicAuth($this->privateKey, '')
                ->timeout(15)
                ->delete("https://api.imagekit.io/v1/files/{$fileId}");

            return $response->successful();
        } catch (\Throwable $e) {
            Log::warning('ImageKit delete failed: '.$e->getMessage());

            return false;
        }
    }
}
