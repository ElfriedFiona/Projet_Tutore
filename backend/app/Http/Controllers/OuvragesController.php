<?php

namespace App\Http\Controllers;

use App\Models\Ouvrages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OuvragesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ouvrages = Ouvrages::with('categorie')->latest()->get();
        return response()->json($ouvrages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'categorie_id'     => 'required|exists:categories,id',
        'isbn'             => 'required|string|unique:ouvrages',
        'titre'            => 'required|string|max:255',
        'auteur'           => 'required|string|max:255',
        'editeur'          => 'nullable|string|max:255',
        'anneePublication' => 'required|integer|min:1900|max:' . date('Y'),        'description'      => 'nullable|string',
        'langue'           => 'nullable|string',
        'nbPages'          => 'required|integer|min:1',
        'emplacement'      => 'nullable|string',
        'imageCouverture'  => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        'nbExemplaire'     => 'required|integer|min:1',
        'statut'           => 'required|in:disponible,indisponible',
        'prixAcquisition'  => 'nullable|numeric|min:0',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Sauvegarder l'image dans le disque 'public'
    if ($request->hasFile('imageCouverture')) {
        $path = $request->file('imageCouverture')->store('ouvrages', 'public');
        // Le chemin à enregistrer dans la BD
        $imagePath = 'storage/' . $path;
    } else {
        return response()->json(['message' => 'Image non reçue.'], 400);
    }

    // 🧠 Créer l’ouvrage avec tous les champs, y compris le chemin image
    $ouvrage = Ouvrages::create([
        ...$request->except('imageCouverture'), // tous les autres champs
        'imageCouverture' => $imagePath,
    ]);

    return response()->json(['message' => 'Ouvrage créé avec succès', 'data' => $ouvrage], 201);
}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ouvrage = Ouvrages::with('categorie')->find($id);

        if (!$ouvrage) {
            return response()->json(['message' => 'Ouvrage non trouvé'], 404);
        }

        return response()->json($ouvrage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ouvrage = Ouvrages::find($id);
        if (!$ouvrage) {
            return response()->json(['message' => 'Ouvrage non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'categorie_id'     => 'sometimes|exists:categories,id',
            'isbn'             => 'sometimes|string|unique:ouvrages,isbn,' . $ouvrage->id,
            'titre'            => 'sometimes|string|max:255',
            'auteur'           => 'sometimes|string|max:255',
            'editeur'          => 'nullable|string|max:255',
            'anneePublication' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'description'      => 'nullable|string',
            'langue'           => 'nullable|string',
            'nbPages'          => 'sometimes|integer|min:1',
            'emplacement'      => 'nullable|string',
            'imageCouverture'  => 'sometimes|string',
            'nbExemplaire'     => 'sometimes|integer|min:1',
            'statut'           => 'sometimes|in:disponible,indisponible',
            'prixAcquisition'  => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ouvrage->update($request->all());

        return response()->json(['message' => 'Ouvrage mis à jour avec succès', 'data' => $ouvrage]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ouvrage = Ouvrages::find($id);
        if (!$ouvrage) {
            return response()->json(['message' => 'Ouvrage non trouvé'], 404);
        }

        $ouvrage->delete();
        return response()->json(['message' => 'Ouvrage supprimé avec succès']);
    }
}
