<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("/users")->group(function () {
    require __DIR__.'/auth.php'; // breeze

    Route::middleware("auth:sanctum")->group(function () {
        Route::get("/", [UserController::class, "getCurrent"])->name("user.get-current");
        Route::put("/", [UserController::class, "update"])->name("user.update");
    });
});
