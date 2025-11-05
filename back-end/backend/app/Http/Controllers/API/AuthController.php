<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'photo'=>'nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'
 ]);

        $photoPath = $request->hasfile('photo')
        ? $request->file('photo')->store('photos', 'public')
        : null;

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::create($request->all());
        $user = User::create([
            'profile_photo'=>$photoPath
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'User registered successfully',
            'user' => $user,
            'profile_photo'=>$photoPath ? Storage::url($photoPath): null,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token,
        ], 200);

    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully'], 200);
    }


}
