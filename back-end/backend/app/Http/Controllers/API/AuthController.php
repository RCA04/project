<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * Controller de Autenticação
 * Gerencia registro, login e logout de usuários
 */
class AuthController extends Controller
{
    /**
     * Registra um novo usuário no sistema
     *
     * @param  Request  $request  Dados do formulário (name, email, password)
     * @return \Illuminate\Http\JsonResponse Token e dados do usuário criado
     */
    public function register(Request $request)
    {
        // Valida os dados recebidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Retorna erros de validação se houver
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Cria o novo usuário (a senha é automaticamente hasheada pelo model)
        $user = User::create($request->all());

        // Gera um token de autenticação para o usuário
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retorna sucesso com token e dados do usuário
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Autentica um usuário existente
     *
     * @param  Request  $request  Dados do formulário (email, password)
     * @return \Illuminate\Http\JsonResponse Token e dados do usuário
     */
    public function login(Request $request)
    {
        // Valida os dados recebidos
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Retorna erros de validação se houver
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Busca o usuário pelo email
        $user = User::where('email', $request->email)->first();

        // Verifica se o usuário existe e se a senha está correta
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Gera um novo token de autenticação
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retorna sucesso com token e dados do usuário
        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    /**
     * Realiza logout do usuário autenticado
     * Revoga o token de acesso atual
     *
     * @return \Illuminate\Http\JsonResponse Mensagem de sucesso
     */
    public function logout(Request $request)
    {
        // Revoga o token de acesso atual do usuário
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully'], 200);
    }
}
