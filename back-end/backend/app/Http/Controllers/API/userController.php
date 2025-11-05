<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use illuminate\Support\Facades\Storage;
class userController extends Controller
{
 public function update(Request $request, int $id)
 {
        /* Busca o usuário pelo ID */
        $user = User::findOrFail($id);

        /* Valida os dados de atualização */
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048']
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

        /* Atualiza o nickname se foi fornecido */
        if (array_key_exists('name', $data))
            $user->name = $data['name'];

        /* Salva as alterações no banco */
        $user->save();

        /* Retorna os dados atualizados do usuário */
        return response()->json([
            'user' => $user,
            'photo_url' => $user->profile_photo ? Storage::url($user->profile_photo) : null,
        ]);
 }
}
