<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable =[
        'user_id',
        'ouvrages_id',
        'dateReservation',
        'dateExpiration',
        'statut',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function ouvrage(){
        return $this->belongsTo(Ouvrages::class);
    }
}
