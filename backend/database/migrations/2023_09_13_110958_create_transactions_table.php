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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('stock_id');
            $table->decimal('purchase_price'); // Change the precision and scale as needed
            $table->date('purchase_date');
            $table->integer('purchase_quantity');
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('users');
            $table->foreign('stock_id')->references('stock_id')->on('stocks');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
