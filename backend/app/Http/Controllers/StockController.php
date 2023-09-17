<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stock;


class StockController extends Controller
{
    public function recentAddedStock() {
        return Stock::orderBy('created_at', 'desc')
        ->get();
    }
}
