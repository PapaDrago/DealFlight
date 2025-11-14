<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class FlightController extends Controller
{
    /**
     * Muestra la página principal de búsqueda de vuelos
     */
    public function index(): Response
    {
        return Inertia::render('Flights/Search');
    }
}
