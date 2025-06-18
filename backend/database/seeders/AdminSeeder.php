<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'nom' => 'Admin',
            'prenom' => 'Principal',
            'email' => 'admin@example.com',
            'telephone' => '28984735',
            'mdp' => Hash::make('admin123'),
            'statut' => 'actif',
            'role' => 'admin',
        ]);

        Admin::create([
            'user_id' => $user->id,
        ]);
    }
}
