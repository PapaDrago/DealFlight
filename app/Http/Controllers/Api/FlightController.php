<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FlightSearchRequest;
use App\Services\AmadeusService;
use Illuminate\Http\JsonResponse;

class FlightController extends Controller
{
    private AmadeusService $amadeusService;

    public function __construct(AmadeusService $amadeusService)
    {
        $this->amadeusService = $amadeusService;
    }

    /**
     * Buscar vuelos
     */
    public function search(FlightSearchRequest $request): JsonResponse
    {
        try {
            $response = $this->amadeusService->searchFlights([
                ...$request->toAmadeusParams(),
                'max' => 6,
            ]);

            return response()->json([
                'success' => true,
                'data' => $response['data'] ?? [],
                'meta' => $response['meta'] ?? [],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al buscar vuelos',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
