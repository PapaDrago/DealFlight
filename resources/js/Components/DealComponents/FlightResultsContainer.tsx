import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import FlightCard from "./FlightCard";

interface FlightResultsContainerProps {
    flights: any[];
    loading: boolean;
    error: string | null;
}

export default function FlightResultsContainer({
    flights,
    loading,
    error,
}: FlightResultsContainerProps) {
    if (loading) {
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Buscando los mejores vuelos...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (flights.length === 0) {
        return null;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                {flights.length} vuelos encontrados
            </Typography>

            <Grid container spacing={2}>
                {flights.map((flight) => (
                    <Grid size={{ xs: 12, md: 4 }} key={flight.id}>
                        <FlightCard flight={flight} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
