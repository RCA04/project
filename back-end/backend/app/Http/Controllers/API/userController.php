<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class userController extends Controller
{
    public function update(Request $request, int $id)
    {
        try {
            /* Busca o usuário pelo ID */
            $user = User::findOrFail($id);

            /* Debug: verificar o que está chegando */
            \Log::info('Update user - dados recebidos', [
                'all' => $request->all(),
                'input_name' => $request->input('name'),
                'has_file' => $request->hasFile('photo'),
                'content_type' => $request->header('Content-Type'),
                'method' => $request->method(),
            ]);

            /* Valida os dados de atualização */
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            ]);

            /* Verifica se foi enviada uma nova foto */
            if ($request->hasFile('photo')) {
                /* Remove a foto antiga se existir */
                if ($user->profile_photo && Storage::disk('public')->exists($user->profile_photo)) {
                    Storage::disk('public')->delete($user->profile_photo);
                }
                /* Salva a nova foto */
                $user->profile_photo = $request->file('photo')->store('photos', 'public');
            }

            /* Atualiza o nome */
            $user->name = $validated['name'];

            /* Salva as alterações no banco */
            $user->save();

            /* Retorna os dados atualizados do usuário */
            return response()->json([
                'message' => 'Perfil atualizado com sucesso',
                'user' => $user,
                'photo_url' => $user->profile_photo ? Storage::url($user->profile_photo) : null,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Usuário não encontrado',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar perfil',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
