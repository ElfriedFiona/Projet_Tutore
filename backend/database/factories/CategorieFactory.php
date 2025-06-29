<?php

namespace Database\Factories;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categorie>
 */
class CategorieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     protected $model = Categorie::class;

    public function definition()
    {
        // Catégories réalistes
        $noms = [
            'Informatique',
            'Littérature',
            'Sciences',
            'Histoire',
            'Art',
            'Mathématiques',
            'Langues',
            'Psychologie',
            'Philosophie',
            'Économie'
        ];

        return [
            'nom' => $this->faker->unique()->randomElement($noms),
        ];
    }
}
