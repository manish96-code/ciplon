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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('qualification')->nullable();
            $table->string('specialization');
            $table->string('clinic_hospital_name');
            $table->text('address')->nullable();
            $table->string('territory');
            $table->string('city')->nullable();
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('visiting_hours')->nullable();
            $table->string('visiting_days')->nullable();
            $table->string('tier')->default('class_a'); // core, class_a, class_b, class_c
            $table->unsignedInteger('target_frequency_per_month')->default(2);
            $table->text('notes')->nullable();
            $table->string('status')->default('active'); // active, inactive
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['specialization', 'territory']);
            $table->index('tier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
