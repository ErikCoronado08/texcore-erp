<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AlmacenFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->unique()->randomElement([
                'Bodega Principal', 
                'Piso de Producción', 
                'Almacén de Mermas'
            ]),
            'direccion' => fake()->address(),
        ];
    }
}