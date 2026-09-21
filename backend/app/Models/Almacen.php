<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    use HasFactory;

    protected $table = 'almacenes';
    protected $fillable = ['nombre', 'direccion'];

    public function rollos()
    {
        return $this->hasMany(RolloLote::class, 'almacen_id');
    }
}