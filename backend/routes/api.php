<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\OuvragesController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\EmpruntController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load($request->user()->role);
});

Route::middleware('auth:sanctum')->group (function () {
    Route::get('/user', function (Request $request) {
    return $request->user()->load($request->user()->role);
});

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('ouvrages', OuvragesController::class);

    Route::get('/categories', [CategorieController::class, 'index']);

    Route::get('/emprunts', [EmpruntController::class, 'index']); 

    Route::get('/emprunts/{id}', [EmpruntController::class, 'show']);

    Route::post('/emprunts', [EmpruntController::class, 'store']);

    Route::post('/emprunts/{id}/valider', [EmpruntController::class, 'validerEmprunt']);

    Route::post('/emprunts/{id}/retour', [EmpruntController::class, 'retourEmprunt']);

    Route::post('/emprunts/{id}/prolonger', [EmpruntController::class, 'prolongerEmprunt']);

    Route::get('/admin/emprunts', [EmpruntController::class, 'indexAll'])->middleware('can:viewAllEmprunts');

    Route::get('/profile', [UserController::class, 'profile']);

    Route::put('/profile', [UserController::class, 'update']);

    Route::get('/profile/statistics', [UserController::class, 'statistics']);

    Route::post('/change-password', [UserController::class, 'changePassword']);

    Route::delete('/delete-account', [AuthController::class, 'delete']);


});


