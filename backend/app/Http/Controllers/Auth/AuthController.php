<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Etudiant;
use App\Models\Admin;
use App\Models\Bibliothecaire;
use App\Models\Enseignant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Enregistrement d'un utilisateur
     */
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'telephone' => 'required|string',
            'mdp' => 'required|string|min:6|confirmed',
            'role' => ['required', Rule::in(['etudiant', 'enseignant', 'admin', 'bibliothecaire'])],
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'role' => $request->role,
            'mdp' => Hash::make($request->mdp),
        ]);

        match ($user->role) {
            'etudiant' => Etudiant::create([
                'user_id' => $user->id,
                'matricule' => $request->matricule ?? uniqid('ETU'),
                'filiere' => $request->filiere ?? 'Inconnue',
                'niveau' => $request->niveau ?? 'Licence 1',
                'departement' => $request->departement ?? 'Non défini',
            ]),
            'enseignant' => Enseignant::create([
                'user_id' => $user->id,
                'departement' => $request->departement ?? 'Informatique',
                'specialite' => $request->specialite ?? 'Génie logiciel',
                'grade' => $request->grade ?? null,
            ]),
            'admin' => Admin::create([
                'user_id' => $user->id,
                'departement' => $request->departement ?? null,
                'niveau' => $request->niveau ?? null,
            ]),
            'bibliothecaire' => Bibliothecaire::create([
                'user_id' => $user->id,
                'departement' => $request->departement ?? 'Bibliothèque',
                'dateRecrutement' => now(),
            ]),
        };

        return response()->json([
            'message' => 'Utilisateur enregistré avec succès. Veuillez vous connecter.',
            'user' => $user->load($user->role),
        ], 201);
    }

    /**
     * Connexion d'un utilisateur
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mdp' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mdp, $user->mdp)) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        if ($user->statut !== 'actif') {
            return response()->json(['message' => 'Votre compte est inactif. Veuillez contacter l’administration.'], 403);
        }

        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'token' => $token,
            'user' => $user->load($user->role),
        ]);
    }

    /**
     * Déconnexion de l'utilisateur
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.'
        ]);
    }

    public function delete(Request $request)
    {
        $user = $request->user();

        // Supprimer les données liées si nécessaire, ex :
        // $user->books()->delete();

        $user->delete();

        return response()->json(['message' => 'Compte supprimé avec succès.']);
    }

}

