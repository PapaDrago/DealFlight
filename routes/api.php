<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FlightController;

Route::prefix('flights')->group(function () {
    Route::post('/search', [FlightController::class, 'search']);
});
