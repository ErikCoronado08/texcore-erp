<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KardexMovimiento extends Model
{
    use HasFactory;

    protected $table = 'kardex_movimientos';
    
    protected $fillable = [
        'rollo_id', 
        'tipo_movimiento', 
        'metraje'
    ];

    protected $casts = [
        'metraje' => 'decimal:2',
    ];

    public function rollo()
    {
        return $this->belongsTo(RolloLote::class, 'rollo_id');
    }
}