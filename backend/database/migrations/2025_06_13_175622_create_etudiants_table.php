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
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('matricule')->unique();
            $table->string('filiere');
            $table->string('niveau');
            $table->string('departement');
            $table->string('nbMaxEmprunt')->nullable();
            $table->string('dureePretMax')->nullable();
            $table->string('nbMaxReservation')->nullable();
            $table->string('favorites')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
