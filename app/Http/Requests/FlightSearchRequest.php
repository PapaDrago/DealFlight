<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlightSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'origin' => 'required|string|size:3',
            'destination' => 'required|string|size:3',
            'departure_date' => 'required|date|after_or_equal:today',
            'return_date' => 'nullable|date|after:departure_date',
            'adults' => 'required|integer|min:1|max:9',
            'children' => 'nullable|integer|min:0|max:9',
            'infants' => 'nullable|integer|min:0|max:9',
            'travel_class' => 'nullable|in:ECONOMY,PREMIUM_ECONOMY,BUSINESS,FIRST',
            'non_stop' => 'nullable|boolean',
            'max_results' => 'nullable|integer|min:1|max:250',
        ];
    }

    /**
     * Transforma los datos al formato de Amadeus
     */
    public function toAmadeusParams(): array
    {
        $params = [
            'originLocationCode' => strtoupper($this->origin),
            'destinationLocationCode' => strtoupper($this->destination),
            'departureDate' => $this->departure_date,
            'adults' => $this->adults,
        ];

        if ($this->return_date) {
            $params['returnDate'] = $this->return_date;
        }

        if ($this->children) {
            $params['children'] = $this->children;
        }

        if ($this->infants) {
            $params['infants'] = $this->infants;
        }

        if ($this->travel_class) {
            $params['travelClass'] = $this->travel_class;
        }

        if ($this->non_stop !== null) {
            $params['nonStop'] = $this->non_stop ? 'true' : 'false';
        }

        if ($this->max_results) {
            $params['max'] = $this->max_results;
        }

        return $params;
    }
}
