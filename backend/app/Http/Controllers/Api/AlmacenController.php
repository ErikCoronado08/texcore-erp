<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Almacen;
use Illuminate\Http\Request;

class AlmacenController extends Controller
{
    public function index()
    {
        // Carga los almacenes junto con sus rollos físicos relacionados
        $almacenes = Almacen::with('rollos')->orderBy('id', 'desc')->get();
        return response()->json($almacenes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255|unique:almacenes,nombre',
            'ubicacion' => 'nullable|string|max:255'
        ]);

        $almacen = Almacen::create($request->all());

        return response()->json($almacen, 201);
    }
}