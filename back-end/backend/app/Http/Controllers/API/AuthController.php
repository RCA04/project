<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
class AuthController extends Controller
{
    public function register(Request $request){
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

         if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $user = User::create($request->all());
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'User registered successfully',
        'user'=> $user,
        'token'=> $token
        ], 201); 
    }
}
