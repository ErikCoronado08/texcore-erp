<?php

namespace Database\Factories;

use App\Models\Producto;
use App\Models\Almacen;
use Illuminate\Database\Eloquent\Factories\Factory;

class RolloLoteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'producto_id' => Producto::inRandomOrder()->first()->id ?? Producto::factory(),
            'almacen_id' => Almacen::inRandomOrder()->first()->id ?? Almacen::factory(),
            'codigo_tinte' => fake()->bothify('DYE-##??'), // Lote de tinte del fabricante
            'metraje_actual' => fake()->randomFloat(2, 10, 100), // Entre 10 y 100 metros
            'costo_adquisicion' => fake()->randomFloat(2, 500, 3000), // Costo del rollo completo
        ];
    }
}