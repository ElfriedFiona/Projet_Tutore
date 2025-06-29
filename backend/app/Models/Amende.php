<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amende extends Model
{
    protected $fillable =[
        'user_id',
        'emprunt_id',
        'type',
        'montant',
        'raison',
        'dateCreation',
        'payee',
        'datePaiement',
        'modePaiement',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function emprunt(){
        return $this->belongsTo(Emprunt::class);
    }
}
