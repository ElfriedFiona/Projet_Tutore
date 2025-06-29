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
        Schema::create('amendes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('emprunt_id')->constrained('emprunts')->onDelete('cascade');
            $table->string('type')->nullable();
            $table->float('montant');
            $table->string('raison');
            $table->date('dateCreation')->nullable();
            $table->boolean('payee')->default(true);
            $table->date('datePaiement')->nullable();
            $table->string('modePaiement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amendes');
    }
};
