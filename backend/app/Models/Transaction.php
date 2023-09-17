<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Transaction extends Model
{
    protected $primaryKey = 'transaction_id';
    protected $fillable = [
        'client_id',
        'stock_id',
        'purchase_price',
        'purchase_date',
        'purchase_quantity',
    ];

    // Define the relationships
    public function client()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class, 'stock_id');
    }
}
