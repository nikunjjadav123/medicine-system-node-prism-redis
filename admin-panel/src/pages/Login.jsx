import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Alert,
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CardContent
} from "@mui/material";

export default function login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async(e) =>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try{
            const res = await api.post("/api/login",{email,password});
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
        }catch (err) {
            if (err.response?.status === 429) {
                setError("Too many login attempts. Please try again after a few minutes.");
            } else {
                setError(
                err.response?.data?.message || "Something went wrong"
                );
            }
            }finally {
                setLoading(false);
            }
        };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Medical Admin Login
                </Typography>
                {error && (
                    <CardContent>
                        <Alert severity="error">
                            <Typography variant="body2">
                                {error}
                            </Typography>
                        </Alert>
                    </CardContent>
                )}
                 <Box component="form">
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={login}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
