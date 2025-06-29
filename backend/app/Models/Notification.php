<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable =[
        'user_id',
        'type',
        'titre',
        'message',
        'lue',
        'envoyee',
        'dateLecture',
        'dateEnvoi',
        'priorite',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
