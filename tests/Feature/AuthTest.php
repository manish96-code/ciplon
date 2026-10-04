<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

test('admin can log in successfully and receive auth token with admin role', function () {
    $admin = User::factory()->admin()->create([
        'email' => 'superadmin@example.com',
        'password' => Hash::make('secret123'),
    ]);

    $response = $this->postJson('/api/v1/login', [
        'email' => 'superadmin@example.com',
        'password' => 'secret123',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Signed in successfully.',
            'data' => [
                'user' => [
                    'email' => 'superadmin@example.com',
                    'role' => 'admin',
                ],
            ],
        ]);

    expect($response->json('data.token'))->not->toBeNull();
});

test('non-admin user is rejected from logging in with 403 status', function () {
    User::factory()->create([
        'email' => 'regular@example.com',
        'password' => Hash::make('secret123'),
        'role' => 'user',
    ]);

    $response = $this->postJson('/api/v1/login', [
        'email' => 'regular@example.com',
        'password' => 'secret123',
    ]);

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Access denied. Administrator privileges required.',
        ]);
});

test('login rejects unregistered email with specific error message', function () {
    $response = $this->postJson('/api/v1/login', [
        'email' => 'unknown@example.com',
        'password' => 'secret123',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'No account found with this email address.',
            'errors' => [
                'email' => ['No account found with this email address.'],
            ],
        ]);
});

test('login rejects incorrect password with specific error message', function () {
    User::factory()->admin()->create([
        'email' => 'admin@example.com',
        'password' => Hash::make('secret123'),
    ]);

    $response = $this->postJson('/api/v1/login', [
        'email' => 'admin@example.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'The password you entered is incorrect.',
            'errors' => [
                'password' => ['The password you entered is incorrect.'],
            ],
        ]);
});

test('authenticated admin can retrieve current profile via me endpoint', function () {
    $admin = User::factory()->admin()->create();
    Sanctum::actingAs($admin);

    $response = $this->getJson('/api/v1/me');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'data' => [
                'id' => $admin->id,
                'email' => $admin->email,
            ],
        ]);
});

test('authenticated admin can log out successfully', function () {
    $admin = User::factory()->admin()->create();
    Sanctum::actingAs($admin);

    $response = $this->postJson('/api/v1/logout');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Signed out successfully.',
        ]);
});
