<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Rotas da API
 * Define todos os endpoints disponíveis para o frontend
 */

// Rota para obter dados do usuário autenticado
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rotas de autenticação (públicas)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas - requerem autenticação
Route::middleware('auth:sanctum')->group(function () {
    // Autenticação
    Route::post('/logout', [AuthController::class, 'logout']);

    // Recursos de Projetos (CRUD completo)
    Route::apiResource('projects', ProjectController::class);

    // Recursos de Tarefas (CRUD completo)
    Route::apiResource('tasks', TaskController::class);

    // Dashboard
    Route::get('/dashboard-stats', [DashboardController::class, 'stats']);

    // Perfil do usuário
    Route::put('/update-user/{id}', [UserController::class, 'update']);
});
