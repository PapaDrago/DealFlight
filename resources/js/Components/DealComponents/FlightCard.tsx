import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Divider,
    Button,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
            duration: string;
        }>;
    }>;
    numberOfBookableSeats: number;
}

interface FlightCardProps {
    flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
        });
    };

    const formatDuration = (duration: string) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        if (!match) return duration;

        const hours = match[1] ? match[1].replace("H", "h ") : "";
        const minutes = match[2] ? match[2].replace("M", "m") : "";
        return hours + minutes;
    };

    const renderItinerary = (
        itinerary: Flight["itineraries"][0],
        index: number
    ) => {
        const firstSegment = itinerary.segments[0];
        const lastSegment = itinerary.segments[itinerary.segments.length - 1];
        const stops = itinerary.segments.length - 1;

        return (
            <Box key={index} sx={{ mb: index === 0 ? 2 : 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Chip
                        label={index === 0 ? "Ida" : "Vuelta"}
                        size="small"
                        color={index === 0 ? "primary" : "secondary"}
                        sx={{ fontWeight: 600 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "text.secondary",
                        }}
                    >
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                            {formatDuration(itinerary.duration)}
                        </Typography>
                    </Box>
                    {stops > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                color: "warning.main",
                            }}
                        >
                            <AirlineStopsIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption" fontWeight={500}>
                                {stops} {stops === 1 ? "escala" : "escalas"}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Salida */}
                    <Box sx={{ textAlign: "left", flex: 1 }}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="primary"
                        >
                            {formatTime(firstSegment.departure.at)}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {firstSegment.departure.iataCode}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formatDate(firstSegment.departure.at)}
                        </Typography>
                    </Box>

                    {/* Icono y línea */}
                    <Box
                        sx={{
                            flex: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mx: 2,
                        }}
                    >
                        <FlightTakeoffIcon
                            sx={{ color: "primary.main", mb: 0.5 }}
                        />
                        <Box
                            sx={{
                                width: "100%",
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                                position: "relative",
                            }}
                        >
                            {stops > 0 && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        border: "2px solid",
                                        borderColor: "warning.main",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        fontWeight={600}
                                        color="warning.main"
                                    >
                                        {stops}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {firstSegment.carrierCode} {firstSegment.number}
                        </Typography>
                    </Box>

                    {/* Llegada */}
                    <Box sx={{ textAlign: "right", flex: 1 }}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="secondary"
                        >
                            {formatTime(lastSegment.arrival.at)}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {lastSegment.arrival.iataCode}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formatDate(lastSegment.arrival.at)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <Card
            elevation={3}
            sx={{
                mb: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    {/* Información de vuelos */}
                    <Box sx={{ flex: 1 }}>
                        {flight.itineraries.map((itinerary, index) => (
                            <div key={index}>
                                {renderItinerary(itinerary, index)}
                                {index < flight.itineraries.length - 1 && (
                                    <Divider sx={{ my: 2 }} />
                                )}
                            </div>
                        ))}
                    </Box>

                    {/* Precio y acción */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            minWidth: "180px",
                            borderLeft: "2px solid",
                            borderColor: "divider",
                            pl: 3,
                        }}
                    >
                        <Box sx={{ textAlign: "right" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    mb: 0.5,
                                }}
                            >
                                <AttachMoneyIcon
                                    sx={{ color: "success.main", fontSize: 20 }}
                                />
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Precio total
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                color="success.main"
                            >
                                $
                                {parseFloat(flight.price.total).toLocaleString(
                                    "es-MX",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {flight.price.currency}
                            </Typography>

                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ mt: 1 }}
                                color="text.secondary"
                            >
                                {flight.numberOfBookableSeats} asientos
                                disponibles
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                background:
                                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                fontWeight: 600,
                                py: 1.5,
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #5568d3 0%, #653a8b 100%)",
                                },
                            }}
                        >
                            Seleccionar
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
