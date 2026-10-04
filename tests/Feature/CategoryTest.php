<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->admin()->create();
    Sanctum::actingAs($this->user);
});

test('unauthenticated access to admin categories is unauthorized', function () {
    app('auth')->forgetGuards();

    $response = $this->getJson('/api/v1/admin/categories');

    $response->assertStatus(401);
});

test('non-admin user cannot access admin categories', function () {
    $regularUser = User::factory()->create(['role' => 'user']);
    Sanctum::actingAs($regularUser);

    $response = $this->getJson('/api/v1/admin/categories');

    $response->assertStatus(403);
});

test('category can be created and saved in database via api', function () {
    $payload = [
        'name' => 'Cardiovascular Formulations',
        'description' => 'Heart and blood vessel treatments',
        'status' => 'active',
    ];

    $response = $this->postJson('/api/v1/admin/categories', $payload);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => [
                'name' => 'Cardiovascular Formulations',
                'slug' => 'cardiovascular-formulations',
            ],
        ]);

    $this->assertDatabaseHas('categories', [
        'name' => 'Cardiovascular Formulations',
        'slug' => 'cardiovascular-formulations',
        'status' => 'active',
    ]);
});

test('sub category can be created with parent_id in database', function () {
    $parent = Category::create([
        'name' => 'Neurology',
        'slug' => 'neurology',
        'status' => 'active',
    ]);

    $payload = [
        'name' => 'Antiepileptics',
        'parent_id' => $parent->id,
        'description' => 'Seizure control drugs',
        'status' => 'active',
    ];

    $response = $this->postJson('/api/v1/admin/categories', $payload);

    $response->assertStatus(201);

    $this->assertDatabaseHas('categories', [
        'name' => 'Antiepileptics',
        'parent_id' => $parent->id,
    ]);
});
