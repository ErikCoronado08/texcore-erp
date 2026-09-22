<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        // Carga los tipos de tela junto con el nombre de su categoría[cite: 24]
        $productos = Producto::with('categoria')->orderBy('id', 'desc')->get();
        return response()->json($productos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'sku' => 'required|string|unique:productos,sku',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $producto = Producto::create($request->all());

        return response()->json($producto->load('categoria'), 201);
    }
}