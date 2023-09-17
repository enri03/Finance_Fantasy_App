<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate some sample transactions data
        for ($i = 1; $i <= 10; $i++) {
            DB::table('transactions')->insert([
                'client_id' => rand(1, 10), // Assuming the users with IDs 1 to 10
                'stock_id' => rand(1, 10), // Assuming the stocks with IDs 1 to 5
                'purchase_price' => rand(10, 1000) / 10.0, // Random decimal price
                'purchase_date' => now()->subDays(rand(1, 365)), // Random date within the last year
                'purchase_quantity' => rand(1, 100), // Random quantity
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
