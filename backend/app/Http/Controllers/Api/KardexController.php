<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KardexMovimiento;
use Illuminate\Http\Request;

class KardexController extends Controller
{
    public function index()
    {
        // Trae el historial de cortes/mermas indicando a qué rollo y tela pertenecen
        $movimientos = KardexMovimiento::with('rollo.producto')->orderBy('id', 'desc')->get();
        return response()->json($movimientos);
    }
}