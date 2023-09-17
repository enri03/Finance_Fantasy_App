<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StockController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::post('add-new-client', [UserController::class,"register"]);
Route::post('login', [UserController::class, 'login']);
Route::get('top-clients-profit',[TransactionController::class, 'topUsersWithHighestProfit']);
Route::get('recent-added-stock', [StockController::class,"recentAddedStock"]);


/*
|--------------------------------------------------------------------------
| Protected API Routes
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user-general-info', [TransactionController::class,"userGeneralInfo"]);
    Route::get('user-transactions', [TransactionController::class,"userTransactions"]);
    Route::get('user-transactions/{id}', [TransactionController::class,"userTransactionsByID"]);
    Route::post('buy-stock', [TransactionController::class,"buyNewStock"]);
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('update-balance', [UserController::class, 'updateUserBalance']);
});

