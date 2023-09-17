<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string',
            'balance' => 'required|numeric',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'balance' => $fields['balance']
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
public function updateUserBalance(Request $request) {
    $user = auth()->user();
    if(!$user){
        return response([
            'message' => 'Not authorized'
        ], 401);
    }
    $userID = $user->id;
    $fields = $request->validate([
        'newBalance' => 'required|numeric'
    ]);
    try {
        $user = User::findOrFail($userID);
        $user->balance = $fields['newBalance'];
        $user->save();
    
        return response()->json(['message' => 'Balance updated successfully']);
    }
    catch (\Exception $e) {
        return response()->json(['message' => 'Something went wrong try later'], 500);
    }

}
    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Wrong Credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }

}
