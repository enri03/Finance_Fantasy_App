<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class TransactionController extends Controller
{
    public function buyNewStock(Request $request) {
        $request->validate([
            'client_id' => 'required|integer',
            'stock_id' => 'required|integer',
            'purchase_price' => 'required|numeric',
            'purchase_date' => 'required',
            'purchase_quantity' => 'required|integer',
            
        ]);

        return Transaction::create($request->all());
    }

    public function userTransactions() {
        $user = auth()->user();
        if(!$user){
            return response([
                'message' => 'Not authorized'
            ], 401);
        }
        $userID = $user->id;
        //return Transaction::where('client_id',$userID)->get();
        $userTransactions = DB::table('transactions')
        ->select('transactions.transaction_id','stocks.name as stock_name','stocks.current_price','transactions.purchase_quantity','transactions.purchase_price',DB::raw('(stocks.current_price - transactions.purchase_price) * transactions.purchase_quantity as profit'),'transactions.created_at')
        ->join('stocks', 'transactions.stock_id', '=', 'stocks.stock_id')
        ->where('transactions.client_id', '=', $userID)
        ->orderByDesc('transactions.created_at')
        ->get();
        return response()->json($userTransactions);
    }
    public function userTransactionsByID($id) {
        $userID = $id;
        $userTransactions = DB::table('transactions')
        ->select('stocks.name as stock_name','stocks.current_price','transactions.purchase_quantity','transactions.purchase_price',DB::raw('stocks.current_price - transactions.purchase_price as profit'),'transactions.created_at')
        ->join('stocks', 'transactions.stock_id', '=', 'stocks.stock_id')
        ->where('transactions.client_id', '=', $userID)
        ->orderByDesc('transactions.created_at')
        ->get();
        return response()->json($userTransactions);
    }

    public function topUsersWithHighestProfit() {
        $topUsersData = DB::table('users')
            ->select('users.id as client_id','users.name', DB::raw('SUM(stocks.current_price - transactions.purchase_price ) as profit'))
            ->join('transactions', 'users.id', '=', 'transactions.client_id')
            ->join('stocks', 'transactions.stock_id', '=', 'stocks.stock_id')
            ->groupBy('users.id')
            ->groupBy('users.name')
            ->orderByDesc('profit') // Order by sum_difference in descending order
            ->limit(3)
            ->get();
    
        return response()->json($topUsersData);
    }
    public function userGeneralInfo() {
        $user = auth()->user();
        if(!$user){
            return response([
                'message' => 'Not authorized'
            ], 401);
        }
        $userID = $user->id;

        $profit = DB::table('users')
            ->select('users.id as client_id','users.balance as user_balance', DB::raw('SUM((stocks.current_price - transactions.purchase_price) * transactions.purchase_quantity) as total_profit'))
            ->join('transactions', 'users.id', '=', 'transactions.client_id')
            ->join('stocks', 'transactions.stock_id', '=', 'stocks.stock_id')
            ->where('transactions.client_id', '=', $userID)
            ->groupBy('users.id','users.balance')
            ->first();
    //if the user has no transactions 
            if (!$profit) {
                $userData = DB::table('users')
                    ->select('users.id as client_id', 'users.balance as user_balance', DB::raw('0 as total_profit'))
                    ->where('users.id', '=', $userID)
                    ->first();
        
                return response()->json($userData);
            }
        
            return response()->json($profit);
        
    }
}
