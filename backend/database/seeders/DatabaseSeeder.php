<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\RolloLote;
use App\Models\KardexMovimiento;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear catálogos fijos
        Categoria::factory(5)->create();
        Almacen::factory(3)->create();
        
        // 2. Crear catálogo de telas/productos
        Producto::factory(20)->create();
        
        // 3. Ingresar rollos físicos a los almacenes
        RolloLote::factory(50)->create();
        
        // 4. Generar historial de cortes y mermas en la mesa de producción
        KardexMovimiento::factory(150)->create();
    }
}