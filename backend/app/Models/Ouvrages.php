<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ouvrages extends Model
{
    use HasFactory;
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
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }
    
    public function emprunt(){
        return $this->hasMany(Emprunt::class);
    }
    
    public function reservation(){
        return $this->hasMany(Reservation::class);
    }
}
