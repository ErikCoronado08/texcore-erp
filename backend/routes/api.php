<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\RolloLoteController;
use App\Http\Controllers\Api\KardexController;
use App\Http\Controllers\Api\AuthController;

// Ruta pública de inicio de sesión
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas mediante token (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Aquí puedes incluir posteriormente las rutas que quieras blindar por completo
});

Route::apiResource('productos', ProductoController::class);
Route::apiResource('rollos', RolloLoteController::class);
Route::post('/rollos', [RolloLoteController::class, 'store']);
Route::apiResource('kardex', KardexController::class);