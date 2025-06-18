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
        Schema::create('emprunts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ouvrage_id')->constrained('ouvrages')->onDelete('cascade');
            $table->date('dateEmprunt');
            $table->date('dateRetourPrevu');
            $table->date('dateRetourEffectif');
            $table->boolean('prolonger')->default(false);
            $table->string('etatRetour')->nullable();
            $table->integer('nbProlongations')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emprunts');
    }
};
