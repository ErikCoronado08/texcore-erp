<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RolloLote;
use Illuminate\Http\Request;
use App\Models\KardexMovimiento;
use Exception;

class RolloLoteController extends Controller
{
    public function index()
    {
        $rollos = RolloLote::with(['producto', 'almacen'])->orderBy('id', 'desc')->get();
        return response()->json($rollos);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'producto_id' => 'required|exists:productos,id',
                'almacen_id' => 'required|exists:almacenes,id',
                'codigo_tinte' => 'required|string',
                'metraje_inicial' => 'required|numeric|min:1',
                'costo_adquisicion' => 'nullable|numeric'
            ]);

            // 1. Crear el nuevo rollo físico asignando un costo por defecto si no viene en la petición
            $rollo = RolloLote::create([
                'producto_id' => $request->producto_id,
                'almacen_id' => $request->almacen_id,
                'codigo_tinte' => $request->codigo_tinte,
                'metraje_actual' => $request->metraje_inicial,
                'costo_adquisicion' => $request->costo_adquisicion ?? 0.00
            ]);

            // 2. Registrar automáticamente el movimiento de entrada por compra en el Kardex
            KardexMovimiento::create([
                'rollo_id' => $rollo->id,
                'tipo_movimiento' => 'entrada_compra',
                'metraje' => $request->metraje_inicial
            ]);

            return response()->json($rollo->load('producto', 'almacen'), 201);

        } catch (Exception $e) {
            // Devuelve el error exacto a la consola del navegador para facilitarte la depuración
            return response()->json([
                'message' => 'Error al procesar la compra',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}