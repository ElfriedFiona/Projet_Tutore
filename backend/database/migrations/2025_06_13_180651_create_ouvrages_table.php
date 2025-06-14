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
        Schema::create('ouvrages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
            $table->string('isbn')->unique();
            $table->string('titre');
            $table->string('auteur');
            $table->string('editeur')->nullable();
            $table->date('anneePublication');
            $table->text('description')->nullable();
            $table->string('langue');
            $table->integer('nbPages');
            $table->string('emplacement')->nullable();
            $table->string('imageCouverture');
            $table->integer('nbExemplaire');
            $table->enum('statut',['disponible', 'indisponible']);
            $table->float('prixAcquisition')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ouvrages');
    }
};
