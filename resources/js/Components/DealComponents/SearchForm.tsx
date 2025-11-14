import React, { useState } from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import PersonIcon from "@mui/icons-material/Person";

interface SearchFormProps {
    onSearch: (data: any) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        departure_date: "",
        return_date: "",
        adults: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 3,
                p: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <TextField
                    name="origin"
                    label="Origen"
                    placeholder="MEX"
                    value={formData.origin}
                    onChange={handleChange}
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        flex: 1,
                        minWidth: "150px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.9)",
                            fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                        "& input::placeholder": {
                            color: "rgba(255,255,255,0.6)",
                            opacity: 1,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FlightTakeoffIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    name="destination"
                    label="Destino"
                    placeholder="JFK"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        flex: 1,
                        minWidth: "150px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.9)",
                            fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                        "& input::placeholder": {
                            color: "rgba(255,255,255,0.6)",
                            opacity: 1,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FlightLandIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    name="departure_date"
                    label="Fecha de salida"
                    type="date"
                    value={formData.departure_date}
                    onChange={handleChange}
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        flex: 1,
                        minWidth: "150px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.9)",
                            fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                    }}
                />

                <TextField
                    name="return_date"
                    label="Fecha de regreso"
                    type="date"
                    value={formData.return_date}
                    onChange={handleChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        flex: 1,
                        minWidth: "150px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.9)",
                            fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                    }}
                />

                <TextField
                    name="adults"
                    label="Pasajeros"
                    type="number"
                    value={formData.adults}
                    onChange={handleChange}
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: 1, max: 9 }}
                    sx={{
                        flex: 0.5,
                        minWidth: "120px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.9)",
                            fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        flex: 0.5,
                        minWidth: "120px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        fontWeight: 600,
                        py: 1,
                        "&:hover": {
                            backgroundColor: "#dc2626",
                            transform: "scale(1.02)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    Buscar
                </Button>
            </Box>
        </Box>
    );
}
