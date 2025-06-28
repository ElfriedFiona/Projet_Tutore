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
        $table->foreignId('ouvrages_id')->constrained('ouvrages')->onDelete('cascade');
        $table->date('dateEmprunt')->nullable(); // Nullable car pas encore récupéré
        $table->date('dateRetourPrevu')->nullable();
        $table->date('dateRetourEffectif')->nullable();
        $table->boolean('prolonger')->default(false);
        $table->integer('nbProlongations')->default(0);
        $table->string('etatRetour')->nullable(); // ex: bon état, abîmé...
        $table->text('notes')->nullable();
        $table->enum('statut', ['en attente', 'en cours', 'terminé', 'annulé'])->default('en attente');
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
