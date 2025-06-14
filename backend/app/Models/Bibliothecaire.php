<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bibliothecaire extends Model
{
    protected $fillable = [
        'user_id',
        'departement',
        'dateRecrutement',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
