<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    protected $fillable = [
        'user_id',
        'matricule',
        'filiere',
        'niveau',
        'departement',
        'nbMaxEmprunt',
        'dureePretMax',
        'nbMaxReservation',
        'favorites',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
