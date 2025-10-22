<?php

use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('projects', ProjectController::class);
Route::apiResource('tasks', TaskController::class);
