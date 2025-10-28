<?php

use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\ProjectController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('projects', ProjectController::class);
Route::apiResource('tasks', TaskController::class);

Route::post('/register', [AuthController::class, 'register']); //register route
Route::post('/login', [AuthController::class, 'login']);    //login route
Route::post('/logout', [AuthController::class, 'logout']); 
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum') 

Route::get('/dashboard-stats',[DashboardController::class, 'stats']);
// Route::get('/dashboard-stats',[DashboardController::class, 'stats'])->middleware('auth:sanctum');