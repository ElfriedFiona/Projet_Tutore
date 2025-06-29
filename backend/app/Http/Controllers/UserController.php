<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Etudiant;
use App\Models\Enseignant;
use App\Models\Admin;
use App\Models\Bibliothecaire;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    /**
     * Retourne le profil complet de l'utilisateur connecté
     */
    public function profile(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user->load($user->role)
        ]);
    }

    /**
     * Met à jour les informations du profil utilisateur
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // Validation commune
        $request->validate([
            'nom' => 'nullable|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'telephone' => 'nullable|string|max:20',
            'mdp' => 'nullable|string|min:6|confirmed',
        ]);

        // Mise à jour des champs de base
        $user->update([
            'nom' => $request->nom ?? $user->nom,
            'prenom' => $request->prenom ?? $user->prenom,
            'email' => $request->email ?? $user->email,
            'telephone' => $request->telephone ?? $user->telephone,
            'mdp' => $request->filled('mdp') ? Hash::make($request->mdp) : $user->mdp,
        ]);

        // Mise à jour selon le rôle
        match ($user->role) {
            'etudiant' => $user->etudiant->update([
                'matricule' => $request->matricule ?? $user->etudiant->matricule,
                'filiere' => $request->filiere ?? $user->etudiant->filiere,
                'niveau' => $request->niveau ?? $user->etudiant->niveau,
                'departement' => $request->departement ?? $user->etudiant->departement,
            ]),
            'enseignant' => $user->enseignant->update([
                'departement' => $request->departement ?? $user->enseignant->departement,
                'specialite' => $request->specialite ?? $user->enseignant->specialite,
                'grade' => $request->grade ?? $user->enseignant->grade,
            ]),
            'admin' => $user->admin->update([
                'departement' => $request->departement ?? $user->admin->departement,
                'niveau' => $request->niveau ?? $user->admin->niveau,
            ]),
            'bibliothecaire' => $user->bibliothecaire->update([
                'departement' => $request->departement ?? $user->bibliothecaire->departement,
                // Pas de modification pour dateRecrutement ici
            ]),
        };

        return response()->json([
            'message' => 'Profil mis à jour avec succès.',
            'user' => $user->fresh()->load($user->role)
        ]);
    }

    // App\Http\Controllers\UserController.php

public function statistics(Request $request)
{
    $user = $request->user();
    $role = $user->role;

    switch ($role) {
        case 'student':
            $etudiant = $user->etudiant; // ou $user directement si les relations sont fusionnées

            return response()->json([
                'currentLoans' => $etudiant->emprunt()->where('statut', 'en cours')->count(),
                'totalReservations' => $etudiant->reservation()->count(), // si tu as cette table
                'totalBooksRead' => $etudiant->emprunt()->where('statut', 'retourné')->count(),
                'favoriteBooks' => $etudiant->favoris()->count() ?? 0, // si tu as
                'roleSpecific' => [
                    'coursesEnrolled' => $etudiant->cours()->count() ?? 0,
                    'assignmentsCompleted' => $etudiant->devoirs()->where('status', 'completed')->count() ?? 0,
                    'gpa' => $etudiant->gpa ?? null,
                ]
            ]);

        case 'teacher':
            $enseignant = $user->enseignant;

            return response()->json([
                'currentLoans' => $enseignant->emprunts()->where('statut', 'en cours')->count(),
                'totalBooksRead' => $enseignant->emprunts()->where('statut', 'retourné')->count(),
                'roleSpecific' => [
                    'studentsSupervised' => $enseignant->encadrements()->count(),
                    'coursesTeaching' => $enseignant->cours()->count(),
                    'publicationsCount' => $enseignant->publications()->count(),
                    'researchProjects' => $enseignant->projets()->count(),
                ]
            ]);

        default:
            return response()->json([
                'currentLoans' => $user->emprunt()->where('statut', 'en cours')->count(),
                'totalBooksRead' => $user->emprunt()->where('statut', 'retourné')->count(),
                'roleSpecific' => []
            ]);
    }
}

public function changePassword(Request $request)
{
    $user = $request->user();

    $request->validate([
        'currentPassword' => 'required',
        'newPassword' => 'required|min:6|confirmed'
    ]);

    if (!Hash::check($request->currentPassword, $user->mdp)) {
        throw ValidationException::withMessages([
            'currentPassword' => ['Le mot de passe actuel est incorrect.']
        ]);
    }

    $user->mdp = bcrypt($request->newPassword);
    $user->save();

    return response()->json(['message' => 'Mot de passe changé avec succès.']);
}


}
