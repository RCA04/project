<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Controller de Tarefas
 * Gerencia operações CRUD de tarefas
 */
class TaskController extends Controller
{
    /**
     * Lista todas as tarefas do usuário autenticado
     * Inclui os dados do projeto associado
     *
     * @return \Illuminate\Http\JsonResponse Lista de tarefas
     */
    public function index()
    {
        // Busca as tarefas do usuário com o projeto relacionado
        $tasks = Task::with('project')->where('user_id', auth()->id())->get();

        return response()->json($tasks, 200);
    }

    /**
     * Cria uma nova tarefa
     *
     * @param  Request  $request  Dados da tarefa (project_id, title, description, status, due_date)
     * @return \Illuminate\Http\JsonResponse Tarefa criada
     */
    public function store(Request $request)
    {
        // Valida os dados recebidos
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,progress,completed',
            'due_date' => 'nullable|date',
        ]);

        // Retorna erros de validação se houver
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Prepara os dados para criação
        $data = [
            'project_id' => $request->project_id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'pending',
            'due_date' => $request->due_date,
            'user_id' => auth()->id(),
        ];

        // Cria a tarefa
        $task = Task::create($data);

        return response()->json($task, 201);
    }

    /**
     * Exibe os detalhes de uma tarefa específica
     * Inclui os dados do projeto associado
     *
     * @param  string  $id  ID da tarefa
     * @return \Illuminate\Http\JsonResponse Dados da tarefa com projeto
     */
    public function show(string $id)
    {
        // Busca a tarefa com o projeto relacionado
        $task = Task::with('project')->find($id);

        if (! $task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task, 200);
    }

    /**
     * Atualiza uma tarefa existente
     *
     * @param  Request  $request  Dados atualizados da tarefa
     * @param  string  $id  ID da tarefa
     * @return \Illuminate\Http\JsonResponse Tarefa atualizada
     */
    public function update(Request $request, string $id)
    {
        // Busca a tarefa
        $task = Task::find($id);

        if (! $task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        // Valida os dados recebidos
        $validator = Validator::make($request->all(), [
            'project_id' => 'sometimes|required|exists:projects,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,progress,completed',
            'due_date' => 'nullable|date',
        ]);

        // Retorna erros de validação se houver
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Atualiza os campos da tarefa
        $task->project_id = $request->project_id ?? $task->project_id;
        $task->title = $request->title ?? $task->title;
        $task->description = $request->description ?? $task->description;
        $task->status = $request->status ?? $task->status;
        $task->due_date = $request->due_date ?? $task->due_date;
        $task->user_id = auth()->id();
        $task->save();

        return response()->json($task, 200);
    }

    /**
     * Remove uma tarefa do sistema
     *
     * @param  string  $id  ID da tarefa
     * @return \Illuminate\Http\JsonResponse Mensagem de sucesso
     */
    public function destroy(string $id)
    {
        // Busca a tarefa
        $task = Task::find($id);

        if (! $task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        // Exclui a tarefa
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
