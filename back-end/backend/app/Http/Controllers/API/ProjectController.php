<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

/**
 * Controller de Projetos
 * Gerencia operações CRUD de projetos
 */
class ProjectController extends Controller
{
    /**
     * Lista todos os projetos do usuário autenticado
     *
     * @return \Illuminate\Http\JsonResponse Lista de projetos
     */
    public function index()
    {
        // Busca apenas os projetos do usuário autenticado
        $projects = Project::where('user_id', auth()->id())->get();

        return response()->json($projects, 200);
    }

    /**
     * Cria um novo projeto
     *
     * @param  Request  $request  Dados do projeto (name, description, due_date)
     * @return \Illuminate\Http\JsonResponse Projeto criado
     */
    public function store(Request $request)
    {
        // Valida os dados recebidos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        // Obtém o ID do usuário autenticado
        $userId = auth()->id();
        if (! $userId) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Prepara os dados para criação
        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'due_date' => $validated['due_date'] ?? null,
            'user_id' => $userId,
        ];

        // Cria o projeto
        $project = Project::create($data);

        return response()->json($project, 201);
    }

    /**
     * Exibe os detalhes de um projeto específico
     * Inclui as tarefas associadas ao projeto
     *
     * @param  string  $id  ID do projeto
     * @return \Illuminate\Http\JsonResponse Dados do projeto com tarefas
     */
    public function show(string $id)
    {
        // Busca o projeto com suas tarefas relacionadas
        $project = Project::with('tasks')->find($id);

        if (! $project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json($project, 200);
    }

    /**
     * Atualiza um projeto existente
     *
     * @param  Request  $request  Dados atualizados do projeto
     * @param  string  $id  ID do projeto
     * @return \Illuminate\Http\JsonResponse Projeto atualizado
     */
    public function update(Request $request, string $id)
    {
        // Busca o projeto
        $project = Project::find($id);

        if (! $project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Valida os dados recebidos
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        // Atualiza os campos do projeto
        $project->name = $request->name;
        $project->description = $request->description;
        $project->due_date = $request->due_date;
        $project->user_id = auth()->id();
        $project->save();

        return response()->json($project, 200);
    }

    /**
     * Remove um projeto do sistema
     *
     * @param  string  $id  ID do projeto
     * @return \Illuminate\Http\JsonResponse Mensagem de sucesso
     */
    public function destroy(string $id)
    {
        // Busca o projeto
        $project = Project::find($id);

        if (! $project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Exclui o projeto (as tarefas relacionadas serão tratadas pelo banco de dados)
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully'], 200);
    }
}
