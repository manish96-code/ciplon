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
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->constrained('doctors')->cascadeOnDelete();
            $table->date('visit_date');
            $table->string('visit_time')->nullable();
            $table->string('call_type')->default('routine_detailing'); // routine_detailing, new_product_launch, sample_delivery, cme_invite, follow_up
            $table->string('status')->default('scheduled'); // scheduled, completed, missed, cancelled
            $table->json('products_detailed')->nullable(); // array of product names
            $table->string('doctor_feedback')->nullable(); // highly_interested, regular_prescriber, trial_prescriber, neutral, negative
            $table->string('samples_given')->nullable();
            $table->text('remarks')->nullable();
            $table->date('next_visit_date')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'visit_date']);
            $table->index(['user_id', 'status']);
            $table->index('doctor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
