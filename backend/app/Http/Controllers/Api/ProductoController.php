<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        // Carga los tipos de tela junto con el nombre de su categoría
        $productos = Producto::with('categoria')->orderBy('id', 'desc')->get();
        return response()->json($productos);
    }
}