<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('projects', ProjectController::class)->middleware('auth:sanctum');
Route::apiResource('tasks', TaskController::class)->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']); // register route
Route::post('/login', [AuthController::class, 'login']);    // login route
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/dashboard-stats',[DashboardController::class, 'stats'])->middleware('auth:sanctum');
