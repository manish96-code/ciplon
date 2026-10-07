<?php

use App\Http\Controllers\MR\MRDashboardController;
use App\Http\Controllers\MR\MRDoctorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| MR API Routes
|--------------------------------------------------------------------------
| Protected via session web middleware and MR authorization.
*/
Route::middleware(['web', 'auth', 'mr'])->prefix('v1/mr')->group(function () {
    Route::get('/dashboard', [MRDashboardController::class, 'index']);
    Route::get('/doctors', [MRDoctorController::class, 'index']);
    Route::post('/doctors', [MRDoctorController::class, 'store']);
    Route::get('/doctors/{id}', [MRDoctorController::class, 'showDoctor']);
    Route::put('/doctors/{id}', [MRDoctorController::class, 'update']);
    Route::delete('/doctors/{id}', [MRDoctorController::class, 'destroy']);
});
