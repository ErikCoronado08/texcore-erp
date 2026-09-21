<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RolloLote;
use Illuminate\Http\Request;

class RolloLoteController extends Controller
{
    public function index()
    {
        // Carga los rollos físicos mostrando de qué tela son y en qué almacén están
        $rollos = RolloLote::with(['producto', 'almacen'])->orderBy('id', 'desc')->get();
        return response()->json($rollos);
    }
}