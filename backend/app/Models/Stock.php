<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $primaryKey = 'stock_id';
    protected $fillable = [
        'name',
        'current_price',
    ];

    // Define any relationships here, if needed
}
