<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
        use HasApiTokens, HasFactory, Notifiable; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'mdp',
        'statut',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'mdp',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'mdp' => 'hashed',
        ];
    }

    public function getAuthPassword()
    {
        return $this->mdp;
    }

    public function admin()
    {
        return $this->hasOne(Admin::class);
    }
    
    public function bibliothecaire()
    {
        return $this->hasOne(Bibliothecaire::class);
    }
    
    public function enseignant()
    {
        return $this->hasOne(Enseignant::class);
    }
    
    public function etudiant()
    {
        return $this->hasOne(Etudiant::class);
    }
    
    public function emprunt()
    {
        return $this->hasMany(Emprunt::class);
    }
    
    public function reservation()
    {
        return $this->hasMany(Reservation::class);
    }
    
    public function notification()
    {
        return $this->hasMany(Notification::class);
    }
    
    public function amende()
    {
        return $this->hasMany(Amende::class);
    }

        public function maxConcurrentEmprunts()
    {
        return match ($this->role) {
            'student', 'étudiant' => 1,
            'teacher', 'enseignant' => 3,
            'librarian', 'bibliothécaire' => 0,
            'admin', 'administrator' => 5,
            default => 1,
        };
    }
}
