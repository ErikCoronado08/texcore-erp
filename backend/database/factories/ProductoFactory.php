<?php

namespace Database\Factories;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'sku' => fake()->unique()->bothify('TEX-####'),
            'nombre' => 'Tela ' . fake()->colorName(),
            'categoria_id' => Categoria::inRandomOrder()->first()->id ?? Categoria::factory(),
        ];
    }
}