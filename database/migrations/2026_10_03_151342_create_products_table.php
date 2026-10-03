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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('brand_name');
            $table->string('generic_name')->nullable();
            $table->string('product_code')->nullable();
            $table->string('slug')->unique();
            $table->string('dosage_form')->nullable();
            $table->string('strength')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->text('indications')->nullable();
            $table->text('directions')->nullable();
            $table->text('precautions')->nullable();
            $table->text('storage')->nullable();
            $table->string('prescription_type', 50)->nullable();
            $table->string('status', 20)->default('active')->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['category_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
