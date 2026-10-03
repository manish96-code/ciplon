<?php

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

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
