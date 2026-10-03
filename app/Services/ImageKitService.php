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

    /**
     * Upload an image file to ImageKit.
     *
     * @return array{file_id: string, url: string, file_name: string, file_path: string, size: int, mime_type: string}
     */
    public function upload(UploadedFile $file, string $folder = '/products', ?string $customFileName = null): array
    {
        $fileName = $customFileName ?: pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME).'_'.time().'.'.$file->getClientOriginalExtension();

        $response = Http::withBasicAuth($this->privateKey, '')
            ->timeout(30)
            ->attach(
                'file',
                file_get_contents($file->getRealPath()),
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
                'response' => $response->json(),
            ]);

            throw new \RuntimeException($response->json('message') ?? 'Failed to upload image to ImageKit.');
        }

        $data = $response->json();

        return [
            'file_id' => $data['fileId'] ?? '',
            'url' => $data['url'] ?? '',
            'file_name' => $data['name'] ?? $fileName,
            'file_path' => $data['filePath'] ?? $data['url'] ?? '',
            'size' => $data['size'] ?? $file->getSize() ?? 0,
            'mime_type' => $file->getClientMimeType() ?: 'image/jpeg',
        ];
    }

    // Delete a file from ImageKit by fileId.
    public function delete(string $fileId): bool
    {
        if (empty($fileId)) {
            return false;
        }

        try {
            $response = Http::withBasicAuth($this->privateKey, '')
                ->timeout(15)
                ->delete("https://api.imagekit.io/v1/files/{$fileId}");

            return $response->successful();
        } catch (\Throwable $e) {
            Log::warning('ImageKit delete failed: '.$e->getMessage());

            return false;
        }
    }
}
