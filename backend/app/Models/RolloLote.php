<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolloLote extends Model
{
    use HasFactory;

    protected $table = 'rollos_lotes';
    
    protected $fillable = [
        'producto_id', 
        'almacen_id', 
        'codigo_tinte', 
        'metraje_actual', 
        'costo_adquisicion'
    ];

    protected $casts = [
        'metraje_actual' => 'decimal:2',
        'costo_adquisicion' => 'decimal:2',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function almacen()
    {
        return $this->belongsTo(Almacen::class);
    }

    public function movimientos()
    {
        return $this->hasMany(KardexMovimiento::class, 'rollo_id');
    }
}