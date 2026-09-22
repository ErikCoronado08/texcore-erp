<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\RolloLoteController;
use App\Http\Controllers\Api\KardexController;

Route::apiResource('productos', ProductoController::class);
Route::apiResource('rollos', RolloLoteController::class);
Route::post('/rollos', [RolloLoteController::class, 'store']);
Route::apiResource('kardex', KardexController::class);