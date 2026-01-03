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
  CardContent,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import VaccinesIcon from "@mui/icons-material/Vaccines";

export default function Login() {
  const { login } = useAuth(); // ✅ context login
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/login", { email, password });

      login(res.data.token); // 🔥 updates AuthContext immediately
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.response?.status === 429) {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <VaccinesIcon sx={{ mr: 1 }} />
          <Typography variant="h5" align="center" gutterBottom>
            Medical Admin Login
          </Typography>
        </Box>
        {error && (
          <CardContent>
            <Alert severity="error">{error}</Alert>
          </CardContent>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
