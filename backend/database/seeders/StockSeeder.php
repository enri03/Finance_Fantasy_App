<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                // Define the number of records you want to generate
                $numberOfRecords = 10;

                // Use a loop to generate and insert the records
                for ($i = 1; $i <= $numberOfRecords; $i++) {
                    DB::table('stocks')->insert([
                        'name' => 'Stock' . $i,
                        'current_price' => rand(10, 100), // Adjust the price range as needed
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
    }
}
