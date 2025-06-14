<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    protected $fillable =[
        'user_id',
        'ouvrage_id',
        'dateEmprunt',
        'dateRetourPrevu',
        'dateRetourEffectif',
        'prolonger',
        'etatRetour',
        'nbProlongations',
        'notes',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function ouvrage(){
        return $this->belongsTo(Ouvrages::class);
    }
    
    public function amende(){
        return $this->hasMany(Amende::class);
    }
}
