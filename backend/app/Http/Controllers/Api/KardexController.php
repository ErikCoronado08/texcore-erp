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

    public function store(Request $request)
    {
        // 1. Validar que los datos vengan correctamente
        $request->validate([
            'rollo_id' => 'required|exists:rollos_lotes,id',
            'tipo_movimiento' => 'required|string',
            'metraje' => 'required|numeric|min:0.1'
        ]);

        // 2. Registrar el movimiento en el Kardex
        $movimiento = KardexMovimiento::create($request->all());

        // 3. Descontar el metraje del rollo físico
        $rollo = \App\Models\RolloLote::find($request->rollo_id);
        
        if ($request->tipo_movimiento === 'salida_corte' || $request->tipo_movimiento === 'merma') {
            $rollo->metraje_actual -= $request->metraje;
            $rollo->save();
        }

        // 4. Devolver el movimiento con sus relaciones cargadas para que React lo pinte
        $movimiento->load('rollo.producto');
        
        return response()->json($movimiento, 201);
    }
}