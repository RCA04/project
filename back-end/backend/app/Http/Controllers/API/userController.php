<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Controller de Usuário
 * Gerencia operações relacionadas ao perfil do usuário
 */
class UserController extends Controller
{
    /**
     * Atualiza os dados do perfil do usuário
     * Suporta atualização de nome e foto de perfil
     *
     * @param  Request  $request  Dados atualizados (name, photo)
     * @param  int  $id  ID do usuário
     * @return \Illuminate\Http\JsonResponse Dados atualizados do usuário
     */
    public function update(Request $request, int $id)
    {
        try {
            // Busca o usuário pelo ID
            $user = User::findOrFail($id);

            // Valida os dados recebidos
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            ]);

            // Verifica se foi enviada uma nova foto
            if ($request->hasFile('photo')) {
                // Remove a foto antiga se existir
                if ($user->profile_photo && Storage::disk('public')->exists($user->profile_photo)) {
                    Storage::disk('public')->delete($user->profile_photo);
                }

                // Salva a nova foto no storage
                $user->profile_photo = $request->file('photo')->store('photos', 'public');
            }

            // Atualiza o nome do usuário
            $user->name = $validated['name'];

            // Salva as alterações no banco de dados
            $user->save();

            // Retorna os dados atualizados do usuário
            return response()->json([
                'message' => 'Perfil atualizado com sucesso',
                'user' => $user,
                'photo_url' => $user->profile_photo ? Storage::url($user->profile_photo) : null,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Retorna erros de validação
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Retorna erro se o usuário não for encontrado
            return response()->json([
                'message' => 'Usuário não encontrado',
            ], 404);

        } catch (\Exception $e) {
            // Retorna erro genérico
            return response()->json([
                'message' => 'Erro ao atualizar perfil',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
