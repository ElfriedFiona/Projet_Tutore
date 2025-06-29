<?php

namespace App\Http\Controllers;

use App\Models\Emprunt;
use App\Models\Ouvrages;
use App\Models\User;
use App\Models\Amende;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EmpruntController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $user = auth()->user();
    $emprunts = Emprunt::with('ouvrage.categorie')
        ->where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($emprunts);
}


    public function indexAll()
    {
        $emprunts = Emprunt::with(['user.etudiant', 'ouvrage.categorie', 'amende'])->latest()->get();
        return response()->json($emprunts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'ouvrages_id' => 'required|exists:ouvrages,id',
        ]);

        $user = auth()->user();

        // Vérifier si le livre est disponible
        $ouvrage = Ouvrages::findOrFail($request->ouvrages_id);

        if ($ouvrage->nbExemplaire < 1) {
            return response()->json(['message' => 'Aucun exemplaire disponible.'], 400);
        }

        // Vérifier qu’il n’a pas déjà 5 emprunts en attente
        $enAttenteCount = Emprunt::where('user_id', $user->id)
            ->where('statut', 'en attente')
            ->count();

        if ($enAttenteCount >= 5) {
            return response()->json(['message' => 'Vous avez déjà 5 emprunts en attente.'], 400);
        }

        // 🔒 2. Empêche un doublon pour un même ouvrage
        $existeDeja = Emprunt::where('user_id', $user->id)
            ->where('ouvrages_id', $request->ouvrages_id)
            ->where('statut', 'en attente')
            ->exists();

        if ($existeDeja) {
            return response()->json([
                'message' => 'Vous avez déjà une demande en attente pour ce livre.'
            ], 400);
        }

        // Créer l’emprunt
        $emprunt = Emprunt::create([
            'user_id' => $user->id,
            'ouvrages_id' => $ouvrage->id,
            'statut' => 'en attente',
        ]);

        // Décrémenter le nombre d’exemplaires
        $ouvrage->decrement('nbExemplaire');

        return response()->json(['message' => 'Demande d’emprunt enregistrée.', 'emprunt' => $emprunt], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $emprunt = Emprunt::with('ouvrage')->findOrFail($id);

        // Sécurité : empêcher un étudiant de voir les emprunts des autres
        if (auth()->id() !== $emprunt->user_id) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        return response()->json($emprunt);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Emprunt $emprunt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Emprunt $emprunt)
    {
        //
    }


    public function validerEmprunt($id)
    {
        $emprunt = Emprunt::findOrFail($id);

        if ($emprunt->statut !== 'en attente') {
            return response()->json(['message' => 'Cet emprunt n’est pas en attente.'], 400);
        }

        $user = $emprunt->user;
        $maxAllowed = $user->maxConcurrentEmprunts();

        if ($maxAllowed === 0) {
            return response()->json(['message' => 'Ce rôle n’est pas autorisé à emprunter.'], 403);
        }

        $empruntsEnCours = Emprunt::where('user_id', $user->id)
            ->where('statut', 'en cours')
            ->count();

        if ($empruntsEnCours >= $maxAllowed) {
            return response()->json([
                'message' => "Limite d’emprunts atteinte. Maximum autorisé : $maxAllowed"
            ], 400);
        }

        $dateEmprunt = now();
        $dateRetourPrevu = $dateEmprunt->copy()->addDays(7);

        $emprunt->update([
            'statut' => 'en cours',
            'dateEmprunt' => $dateEmprunt,
            'dateRetourPrevu' => $dateRetourPrevu,
        ]);

        return response()->json(['message' => 'Emprunt validé.', 'emprunt' => $emprunt]);
    }


    public function retourEmprunt($id, Request $request)
    {
        $emprunt = Emprunt::findOrFail($id);

        if ($emprunt->statut !== 'en cours') {
            return response()->json(['message' => 'Cet emprunt n’est pas actif.'], 400);
        }

        $user = auth()->user();

        if ($user->role === 'librarian' || $user->role === 'bibliothécaire') {
            // Rôle autorisé à finaliser le retour
            $emprunt->update([
                'statut' => 'terminé',
                'dateRetourEffectif' => now(),
                'etatRetour' => $request->etatRetour,
                'notes' => $request->notes,
            ]);

            // Réincrémenter les exemplaires
            $emprunt->ouvrage->increment('nbExemplaire');

            return response()->json(['message' => 'Livre retourné avec succès.']);
        } else {
            // Rôles non-bibliothécaires : signaler seulement
            $emprunt->update([
                'notes' => $request->notes ?? 'Retour signalé par l’utilisateur.',
                'etatRetour' => $request->etatRetour ?? 'retour_signalé',
            ]);

            return response()->json([
                'message' => 'Votre retour a été pris en compte. Il sera validé par un bibliothécaire.'
            ]);
        }
    }


    public function prolongerEmprunt($id)
    {
        $emprunt = Emprunt::findOrFail($id);

        if ($emprunt->statut !== 'en cours') {
            return response()->json(['message' => 'Seuls les emprunts actifs peuvent être prolongés.'], 400);
        }

        if ($emprunt->nbProlongations >= 3) {
            return response()->json(['message' => 'Nombre maximum de prolongations atteint.'], 400);
        }

        $newDateRetour = \Carbon\Carbon::parse($emprunt->dateRetourPrevu)->addDays(7);

        $emprunt->update([
            'dateRetourPrevu' => $newDateRetour,
            'nbProlongations' => $emprunt->nbProlongations + 1,
            'prolonger' => true,
        ]);

        return response()->json(['message' => 'Emprunt prolongé.', 'nouvelle_date' => $newDateRetour]);
    }

    public function verifierRetards()
    {
        $empruntsEnCours = Emprunt::where('statut', 'en cours')
            ->whereDate('dateRetourPrevu', '<', now())
            ->get();

        foreach ($empruntsEnCours as $emprunt) {
            // Appliquer logique d’amende si nécessaire
            // Exemple : 500 FCFA par jour
            $joursRetard = now()->diffInDays(\Carbon\Carbon::parse($emprunt->dateRetourPrevu));

            // Exemple simple : créer une amende associée
            $emprunt->amende()->create([
                'montant' => $joursRetard * 500,
                'raison' => 'Retard de retour de l\'ouvrage',
            ]);
        }

        return response()->json(['message' => 'Retards vérifiés.']);
    }


}
