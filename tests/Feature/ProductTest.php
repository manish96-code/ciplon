<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('product can be created with compositions via api', function () {
    $category = Category::create([
        'name' => 'Antibiotics',
        'slug' => 'antibiotics',
        'status' => 'active',
    ]);

    $payload = [
        'category_id' => $category->id,
        'brand_name' => 'AzithroMax 500',
        'generic_name' => 'Azithromycin Tablets IP',
        'product_code' => 'AZM-500',
        'dosage_form' => 'Tablet',
        'strength' => '500 mg',
        'short_description' => 'Broad spectrum macrolide antibiotic',
        'description' => 'Effective against respiratory and skin infections.',
        'indications' => 'Community acquired pneumonia, pharyngitis',
        'directions' => 'One tablet daily for 3 days or as directed by physician',
        'precautions' => 'Contraindicated in hepatic impairment',
        'storage' => 'Store below 25°C in a dry place',
        'prescription_type' => 'Schedule H Prescription Drug',
        'status' => 'active',
        'is_featured' => true,
        'compositions' => [
            [
                'ingredient_name' => 'Azithromycin Dihydrate',
                'strength' => '500',
                'unit' => 'mg',
            ],
        ],
    ];

    $response = $this->postJson('/api/v1/admin/products', $payload);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Product created successfully.',
            'data' => [
                'brand_name' => 'AzithroMax 500',
                'slug' => 'azithromax-500',
                'product_code' => 'AZM-500',
            ],
        ]);

    $this->assertDatabaseHas('products', [
        'brand_name' => 'AzithroMax 500',
        'slug' => 'azithromax-500',
        'category_id' => $category->id,
        'is_featured' => 1,
    ]);

    $this->assertDatabaseHas('product_compositions', [
        'ingredient_name' => 'Azithromycin Dihydrate',
        'strength' => '500',
        'unit' => 'mg',
    ]);
});

test('products list can be fetched with category and search filter', function () {
    $category = Category::create([
        'name' => 'Cardiology',
        'slug' => 'cardiology',
        'status' => 'active',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'brand_name' => 'CardioVasc 10',
        'generic_name' => 'Amlodipine',
        'product_code' => 'CV-10',
        'slug' => 'cardiovasc-10',
        'status' => 'active',
        'is_featured' => true,
    ]);

    $response = $this->getJson('/api/v1/admin/products?search=CardioVasc');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'meta' => [
                'total' => 1,
            ],
        ]);
});

test('product can be updated and compositions synchronized', function () {
    $category = Category::create([
        'name' => 'Neurology',
        'slug' => 'neurology',
        'status' => 'active',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'brand_name' => 'NeuroCalm 25',
        'slug' => 'neurocalm-25',
        'status' => 'active',
    ]);

    $product->compositions()->create([
        'ingredient_name' => 'Pregabalin',
        'strength' => '25',
        'unit' => 'mg',
    ]);

    $payload = [
        'category_id' => $category->id,
        'brand_name' => 'NeuroCalm 50',
        'status' => 'active',
        'compositions' => [
            [
                'ingredient_name' => 'Pregabalin',
                'strength' => '50',
                'unit' => 'mg',
            ],
        ],
    ];

    $response = $this->putJson("/api/v1/admin/products/{$product->id}", $payload);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'data' => [
                'brand_name' => 'NeuroCalm 50',
                'slug' => 'neurocalm-50',
            ],
        ]);

    $this->assertDatabaseHas('product_compositions', [
        'product_id' => $product->id,
        'strength' => '50',
    ]);

    $this->assertDatabaseMissing('product_compositions', [
        'product_id' => $product->id,
        'strength' => '25',
    ]);
});

test('product status can be updated via patch endpoint', function () {
    $category = Category::create([
        'name' => 'Dermatology',
        'slug' => 'dermatology',
        'status' => 'active',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'brand_name' => 'DermaClear',
        'slug' => 'dermaclear',
        'status' => 'active',
    ]);

    $response = $this->patchJson("/api/v1/admin/products/{$product->id}/status", [
        'status' => 'inactive',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'data' => [
                'status' => 'inactive',
            ],
        ]);

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'status' => 'inactive',
    ]);
});

test('product and its compositions can be deleted', function () {
    $category = Category::create([
        'name' => 'Gastroenterology',
        'slug' => 'gastroenterology',
        'status' => 'active',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'brand_name' => 'GastroZole',
        'slug' => 'gastrozole',
        'status' => 'active',
    ]);

    $product->compositions()->create([
        'ingredient_name' => 'Pantoprazole',
        'strength' => '40',
        'unit' => 'mg',
    ]);

    $response = $this->deleteJson("/api/v1/admin/products/{$product->id}");

    $response->assertStatus(200);

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
    $this->assertDatabaseMissing('product_compositions', ['product_id' => $product->id]);
});
