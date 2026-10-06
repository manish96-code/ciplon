<?php

use App\Http\Controllers\MR\MRDashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| MR API Routes
|--------------------------------------------------------------------------
| Protected via session web middleware and MR authorization.
*/
Route::middleware(['web', 'auth', 'mr'])->prefix('v1/mr')->group(function () {
    Route::get('/dashboard', [MRDashboardController::class, 'index']);
});
