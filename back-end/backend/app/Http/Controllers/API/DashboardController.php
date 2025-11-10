<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;

/**
 * Controller do Dashboard
 * Fornece estatísticas para o dashboard do usuário
 */
class DashboardController extends Controller
{
    /**
     * Retorna estatísticas do dashboard do usuário autenticado
     * Inclui contagem de projetos e tarefas
     * 
     * @return \Illuminate\Http\JsonResponse Estatísticas do dashboard
     */
    public function stats()
    {
        // Conta projetos e tarefas do usuário autenticado
        $stats = [
            'projects_count' => Project::where('user_id', auth()->id())->count(),
            'tasks_count' => Task::where('user_id', auth()->id())->count(),
        ];

        return response()->json($stats, 200);
    }
}
