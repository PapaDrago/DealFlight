import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import SearchForm from "@/Components/DealComponents/SearchForm";
import FlightResultsContainer from "@/Components/DealComponents/FlightResultsContainer";
import axios from "axios";

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (formData: any) => {
        setLoading(true);
        setError(null);
        setFlights([]);

        try {
            const response = await axios.post("/api/flights/search", formData);
            console.log(response);
            if (response.data.success) {
                setFlights(response.data.data);

                if (response.data.data.length === 0) {
                    setError(
                        "No se encontraron vuelos para esta búsqueda. Intenta con otras fechas o aeropuertos."
                    );
                }
            } else {
                setError(response.data.message || "Error al buscar vuelos");
            }
        } catch (err: any) {
            console.error("Error buscando vuelos:", err);
            setError(
                err.response?.data?.message ||
                    "Ocurrió un error al buscar vuelos. Por favor intenta nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Buscar Vuelos - DealFlight" />

            <Box
                sx={{
                    background:
                        "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)",
                    minHeight: "100vh",
                    py: 4,
                }}
            >
                <Container maxWidth="lg">
                    {/* Hero Section */}
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Typography
                            variant="h3"
                            fontWeight={700}
                            sx={{
                                background:
                                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                mb: 1,
                            }}
                        >
                            ✈️ DealFlight
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight={400}
                        >
                            Encuentra los mejores vuelos al mejor precio
                        </Typography>
                    </Box>

                    {/* Formulario de búsqueda */}
                    <SearchForm onSearch={handleSearch} loading={loading} />

                    {/* Resultados */}
                    <FlightResultsContainer
                        flights={flights}
                        loading={loading}
                        error={error}
                    />
                </Container>
            </Box>
        </>
    );
}
