<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ouvrages extends Model
{
    protected $fillable =[
        'categorie_id',
        'isbn',
        'titre',
        'auteur',
        'editeur',
        'anneePublication',
        'description',
        'langue',
        'nbPages',
        'emplacement',
        'imageCouverture',
        'nbExemplaire',
        'statut',
        'prixAcquisition',
    ];

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }
    
    public function emprunt(){
        return $this->hasMany(Emprunt::class);
    }
    
    public function reservation(){
        return $this->hasMany(Reservation::class);
    }
}
