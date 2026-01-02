import api from "../services/api";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // 🧠 Handle both object & array (safe)
      const userData = res.data.data;

      setUser(userData);
      console.log("PROFILE RESPONSE:", userData);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">User profile not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: 360, textAlign: "center", p: 3 }}>
        <Avatar
          src={
            user.profile_photo
              ? `${import.meta.env.VITE_API_URL}${user.profile_photo}`
              : undefined
          }
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 2,
            bgcolor: "primary.main",
            fontSize: 36,
          }}
        >
          {!user.profile_photo && user.name?.charAt(0)}
        </Avatar>

        <CardContent>
          <Typography color="text.secondary" fontWeight={600}>
            {user.name}
          </Typography>

          <Typography color="text.secondary">
            {user.email}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1, fontWeight: 500 }}
          >
            {user.role.replaceAll("_", " ")}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
