<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kardex_movimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rollo_id')->constrained('rollos_lotes')->restrictOnDelete();
            $table->string('tipo_movimiento', 50); // entrada_compra, salida_corte, merma
            $table->decimal('metraje', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kardex_movimientos');
    }
};
