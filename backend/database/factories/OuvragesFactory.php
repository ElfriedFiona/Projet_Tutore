<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Ouvrages;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ouvrages>
 */
class OuvragesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Ouvrages::class;

    public function definition()
    {
        return [
            'categorie_id' => Categorie::inRandomOrder()->first()->id ?? Categorie::factory(), // Assure-toi d’avoir des catégories
            'isbn' => $this->faker->unique()->isbn13(),
            'titre' => $this->faker->sentence(3),
            'auteur' => $this->faker->name(),
            'editeur' => $this->faker->company(),
            'anneePublication' => $this->faker->dateTimeBetween('-20 years', 'now')->format('Y'),
            'description' => $this->faker->paragraph(),
            'langue' => $this->faker->randomElement(['Français', 'Anglais', 'Espagnol', 'Arabe']),
            'nbPages' => $this->faker->numberBetween(100, 800),
            'emplacement' => $this->faker->randomElement(['Rayon A1', 'Rayon B2', 'Rayon C3']),
            'imageCouverture' => 'storage/ouvrages/default.jpg', // Image fictive par défaut
            'nbExemplaire' => $this->faker->numberBetween(1, 10),
            'statut' => $this->faker->randomElement(['disponible', 'indisponible']),
            'prixAcquisition' => $this->faker->randomFloat(2, 5, 100),
        ];
    }
}
