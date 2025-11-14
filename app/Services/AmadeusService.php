<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AmadeusService
{
    private Client $client;
    private string $apiUrl;
    private string $tokenUrl;
    private string $apiKey;
    private string $apiSecret;

    public function __construct()
    {
        $this->client = new Client([
            'timeout' => 30,
            'verify' => false,
        ]);

        $this->apiUrl = config('services.amadeus.api_url');
        $this->tokenUrl = config('services.amadeus.token_url');
        $this->apiKey = config('services.amadeus.api_key');
        $this->apiSecret = config('services.amadeus.api_secret');
    }

    /**
     * Obtiene el access token (con cache)
     */
    private function getAccessToken(): string
    {
        return Cache::remember('amadeus_access_token', now()->addMinutes(25), function () {
            try {
                $response = $this->client->post($this->tokenUrl, [
                    'form_params' => [
                        'grant_type' => 'client_credentials',
                        'client_id' => $this->apiKey,
                        'client_secret' => $this->apiSecret,
                    ],
                ]);

                $data = json_decode($response->getBody(), true);

                Log::info('Amadeus token obtenido exitósamente', ['respuesta' => $data]);

                return $data['access_token'];
            } catch (\Exception $e) {
                Log::error('Error obteniendo token de Amadeus: ' . $e->getMessage());
                throw new \Exception('No se pudo autenticar con Amadeus API');
            }
        });
    }

    /**
     * Hace una petición GET a la API de Amadeus
     */
    public function get(string $endpoint, array $params = []): array
    {
        try {
            $token = $this->getAccessToken();

            $response = $this->client->get($this->apiUrl . $endpoint, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ],
                'query' => $params,
            ]);

            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            Log::error('Error en petición GET a Amadeus: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Buscar vuelos
     */
    public function searchFlights(array $params): array
    {
        return $this->get('/shopping/flight-offers', $params);
    }
}
