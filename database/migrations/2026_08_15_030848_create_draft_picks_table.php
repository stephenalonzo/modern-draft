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
        Schema::create('draft_picks', function (Blueprint $table) {
            $table->id();
            $table->string('draft_id');
            $table->string('player_first_name');
            $table->string('player_last_name');
            $table->string('coach');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draft_picks');
    }
};
