import { FormEvent, useState } from "react";
import { Button, TextField, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import PersonIcon from "@mui/icons-material/Person";

interface SearchFormData {
    origin: string;
    destination: string;
    departure_date: string;
    return_date: string;
    adults: number;
}

interface SearchFormProps {
    onSearch: (data: SearchFormData) => void;
    loading?: boolean;
}

export default function SearchForm({
    onSearch,
    loading = false,
}: SearchFormProps) {
    const [formData, setFormData] = useState<SearchFormData>({
        origin: "",
        destination: "",
        departure_date: "",
        return_date: "",
        adults: 1,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(formData);
    };

    const handleChange =
        (field: keyof SearchFormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
                field === "adults" ? parseInt(e.target.value) : e.target.value;
            setFormData((prev) => ({ ...prev, [field]: value }));
        };

    const today = new Date().toISOString().split("T")[0];

    return (
        <Paper
            elevation={4}
            sx={{
                p: 2.5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 3,
            }}
        >
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Origen */}
                    <div
                        style={{
                            position: "relative",
                            minWidth: "120px",
                            flex: "1",
                        }}
                    >
                        <FlightTakeoffIcon
                            sx={{
                                position: "absolute",
                                left: 8,
                                top: 14,
                                color: "rgba(255,255,255,0.7)",
                                zIndex: 1,
                                fontSize: 20,
                            }}
                        />
                        <TextField
                            size="small"
                            placeholder="MEX"
                            value={formData.origin}
                            onChange={handleChange("origin")}
                            inputProps={{
                                maxLength: 3,
                                style: {
                                    textTransform: "uppercase",
                                    paddingLeft: "32px",
                                    fontSize: "14px",
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    borderRadius: 2,
                                    "& fieldset": { border: "none" },
                                },
                            }}
                            required
                        />
                    </div>

                    {/* Destino */}
                    <div
                        style={{
                            position: "relative",
                            minWidth: "120px",
                            flex: "1",
                        }}
                    >
                        <FlightLandIcon
                            sx={{
                                position: "absolute",
                                left: 8,
                                top: 14,
                                color: "rgba(255,255,255,0.7)",
                                zIndex: 1,
                                fontSize: 20,
                            }}
                        />
                        <TextField
                            size="small"
                            placeholder="JFK"
                            value={formData.destination}
                            onChange={handleChange("destination")}
                            inputProps={{
                                maxLength: 3,
                                style: {
                                    textTransform: "uppercase",
                                    paddingLeft: "32px",
                                    fontSize: "14px",
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    borderRadius: 2,
                                    "& fieldset": { border: "none" },
                                },
                            }}
                            required
                        />
                    </div>

                    {/* Fecha Salida */}
                    <TextField
                        size="small"
                        type="date"
                        value={formData.departure_date}
                        onChange={handleChange("departure_date")}
                        inputProps={{
                            min: today,
                            style: { fontSize: "14px" },
                        }}
                        sx={{
                            minWidth: "150px",
                            flex: "1",
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "rgba(255,255,255,0.95)",
                                borderRadius: 2,
                                "& fieldset": { border: "none" },
                            },
                        }}
                        required
                    />

                    {/* Fecha Regreso */}
                    <TextField
                        size="small"
                        type="date"
                        value={formData.return_date}
                        onChange={handleChange("return_date")}
                        inputProps={{
                            min: formData.departure_date || today,
                            style: { fontSize: "14px" },
                        }}
                        sx={{
                            minWidth: "150px",
                            flex: "1",
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "rgba(255,255,255,0.95)",
                                borderRadius: 2,
                                "& fieldset": { border: "none" },
                            },
                        }}
                    />

                    {/* Pasajeros */}
                    <div
                        style={{
                            position: "relative",
                            minWidth: "90px",
                            flex: "0 0 auto",
                        }}
                    >
                        <PersonIcon
                            sx={{
                                position: "absolute",
                                left: 8,
                                top: 14,
                                color: "rgba(255,255,255,0.7)",
                                zIndex: 1,
                                fontSize: 20,
                            }}
                        />
                        <TextField
                            size="small"
                            type="number"
                            value={formData.adults}
                            onChange={handleChange("adults")}
                            inputProps={{
                                min: 1,
                                max: 9,
                                style: {
                                    paddingLeft: "32px",
                                    fontSize: "14px",
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    borderRadius: 2,
                                    "& fieldset": { border: "none" },
                                },
                            }}
                            required
                        />
                    </div>

                    {/* Botón Buscar */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={<SearchIcon />}
                        sx={{
                            minWidth: "140px",
                            backgroundColor: "#FF2D20",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "14px",
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            "&:hover": {
                                backgroundColor: "#E02718",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(255,45,32,0.4)",
                            },
                            transition: "all 0.2s ease",
                            "&:disabled": {
                                backgroundColor: "rgba(255,255,255,0.3)",
                                color: "rgba(255,255,255,0.6)",
                            },
                        }}
                    >
                        {loading ? "Buscando..." : "Buscar"}
                    </Button>
                </div>
            </form>
        </Paper>
    );
}
