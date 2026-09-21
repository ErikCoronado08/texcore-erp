<?php

namespace Database\Factories;

use App\Models\RolloLote;
use Illuminate\Database\Eloquent\Factories\Factory;

class KardexMovimientoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'rollo_id' => RolloLote::inRandomOrder()->first()->id ?? RolloLote::factory(),
            'tipo_movimiento' => fake()->randomElement(['entrada_compra', 'salida_corte', 'merma']),
            'metraje' => fake()->randomFloat(2, 1, 25), // Consumo en metros por cada movimiento
        ];
    }
}