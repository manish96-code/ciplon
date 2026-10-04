<?php

use App\Http\Controllers\Api\V1\Admin\CategoryController;
use App\Http\Controllers\Api\V1\Admin\ProductController;
use App\Http\Controllers\Api\V1\Admin\SettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    // Public Company Profile
    Route::get('company-profile', [SettingController::class, 'publicProfile']);

    Route::prefix('admin')->group(function () {
        // Category Management
        Route::get('categories', [CategoryController::class, 'index']);
        Route::post('categories', [CategoryController::class, 'store']);
        Route::get('categories/{category}', [CategoryController::class, 'show']);
        Route::put('categories/{category}', [CategoryController::class, 'update']);
        Route::delete('categories/{category}', [CategoryController::class, 'destroy']);
        Route::patch('categories/{category}/status', [CategoryController::class, 'updateStatus']);

        // Product Management
        Route::get('products', [ProductController::class, 'index']);
        Route::post('products', [ProductController::class, 'store']);
        Route::get('products/{product}', [ProductController::class, 'show']);
        Route::match(['put', 'post'], 'products/{product}', [ProductController::class, 'update']);
        Route::delete('products/{product}', [ProductController::class, 'destroy']);
        Route::patch('products/{product}/status', [ProductController::class, 'updateStatus']);

        // Business Settings & Company Profile
        Route::get('settings', [SettingController::class, 'index']);
        Route::match(['put', 'post'], 'settings', [SettingController::class, 'update']);
    });
});
