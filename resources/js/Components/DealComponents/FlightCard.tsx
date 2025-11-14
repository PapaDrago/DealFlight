import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Flight {
    id: string;
    price: {
        total: string;
        currency: string;
    };
    itineraries: Array<{
        duration: string;
        segments: Array<{
            departure: {
                iataCode: string;
                at: string;
            };
            arrival: {
                iataCode: string;
                at: string;
            };
            carrierCode: string;
            number: string;
        }>;
    }>;
    numberOfBookableSeats: number;
}

interface FlightCardProps {
    flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDuration = (duration: string) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        if (!match) return duration;
        const hours = match[1] ? match[1].replace("H", "h ") : "";
        const minutes = match[2] ? match[2].replace("M", "m") : "";
        return hours + minutes;
    };

    console.log(flight);

    return (
        <Card
            elevation={2}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                    transition: "all 0.3s ease",
                },
            }}
        >
            <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
                {/* Itinerarios */}
                {flight.itineraries.map((itinerary, index) => {
                    const firstSegment = itinerary.segments[0];
                    const lastSegment =
                        itinerary.segments[itinerary.segments.length - 1];

                    return (
                        <Box key={index} sx={{ mb: index === 0 ? 2 : 0 }}>
                            {/* Etiqueta Ida/Vuelta */}
                            <Chip
                                label={index === 0 ? "Ida" : "Vuelta"}
                                size="small"
                                color={index === 0 ? "primary" : "secondary"}
                                sx={{ mb: 1 }}
                            />

                            {/* Salida y Llegada */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                {/* Salida */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <FlightTakeoffIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {formatTime(
                                                firstSegment.departure.at
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {firstSegment.departure.iataCode}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Duración */}
                                <Box sx={{ textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                        }}
                                    >
                                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                                        <Typography variant="caption">
                                            {formatDuration(itinerary.duration)}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Llegada */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Box sx={{ textAlign: "right" }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {formatTime(lastSegment.arrival.at)}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {lastSegment.arrival.iataCode}
                                        </Typography>
                                    </Box>
                                    <FlightLandIcon
                                        color="secondary"
                                        fontSize="small"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    );
                })}

                {/* Precio y Botón */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        mt: "auto",
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="success.main"
                        >
                            $
                            {parseFloat(flight.price.total).toLocaleString(
                                "es-MX"
                            )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {flight.price.currency} •{" "}
                            {flight.numberOfBookableSeats} asientos
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            background:
                                "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)",
                            color: "white",
                            fontWeight: 600,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "0 3px 10px rgba(255,107,107,0.3)",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #FF5252 30%, #FF7043 90%)",
                                boxShadow: "0 6px 20px rgba(255,107,107,0.4)",
                                transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Seleccionar vuelo
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
