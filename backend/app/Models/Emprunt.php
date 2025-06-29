<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    protected $fillable =[
        'user_id',
        'ouvrages_id',
        'dateEmprunt',
        'dateRetourPrevu',
        'dateRetourEffectif',
        'prolonger',
        'etatRetour',
        'nbProlongations',
        'notes',
        'statut',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function ouvrage(){
        return $this->belongsTo(Ouvrages::class, 'ouvrages_id');
    }
    
    public function amende(){
        return $this->hasMany(Amende::class);
    }
}
