<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Authenticate user and return access token & profile.
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The provided credentials do not match our records.',
            ], 422);
        }

        $token = null;
        try {
            if (method_exists($user, 'createToken')) {
                $token = $user->createToken('admin-token')->plainTextToken;
            }
        } catch (\Throwable) {
            $token = Str::random(64);
        }

        if (! $token) {
            $token = Str::random(64);
        }

        return response()->json([
            'success' => true,
            'message' => 'Signed in successfully.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'token' => $token,
            ],
        ]);
    }

    // Return the currently authenticated user.
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    }

    // Invalidate user session / token.
    public function logout(Request $request): JsonResponse
    {
        try {
            if ($request->user() && method_exists($request->user(), 'currentAccessToken')) {
                $request->user()->currentAccessToken()?->delete();
            }
        } catch (\Throwable) {
            // gracefully ignore
        }

        return response()->json([
            'success' => true,
            'message' => 'Signed out successfully.',
        ]);
    }
}
