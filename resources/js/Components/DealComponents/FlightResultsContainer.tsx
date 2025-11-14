import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import FlightCard from "./FlightCard";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface FlightResultsContainerProps {
    flights: any[];
    loading: boolean;
    error?: string | null;
}

export default function FlightResultsContainer({
    flights,
    loading,
    error,
}: FlightResultsContainerProps) {
    if (loading) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 6,
                    mt: 3,
                    textAlign: "center",
                    background:
                        "linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%)",
                }}
            >
                <CircularProgress size={60} />
                <Typography
                    variant="h6"
                    sx={{ mt: 3, color: "text.secondary" }}
                >
                    Buscando los mejores vuelos para ti...
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    Esto puede tomar unos segundos
                </Typography>
            </Paper>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 3 }}>
                <Typography variant="body1" fontWeight={600}>
                    {error}
                </Typography>
            </Alert>
        );
    }

    if (flights.length === 0) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 6,
                    mt: 3,
                    textAlign: "center",
                    background:
                        "linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%)",
                }}
            >
                <SearchOffIcon
                    sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
                />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    No se encontraron vuelos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Intenta cambiar las fechas o los aeropuertos de origen y
                    destino
                </Typography>
            </Paper>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    mb: 2,
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                <Typography variant="h6" fontWeight={600} color="white">
                    {flights.length}{" "}
                    {flights.length === 1
                        ? "vuelo encontrado"
                        : "vuelos encontrados"}
                </Typography>
            </Paper>

            {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </Box>
    );
}
