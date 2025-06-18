<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    protected $fillable =[
        'user_id',
        'departement',
        'specialite',
        'grade',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
