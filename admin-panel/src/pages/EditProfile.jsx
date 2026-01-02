import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [user, setUser] = useState(null);

  // 🔹 Load profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const userData = res.data.data;
      setUser(userData);

      setForm({
        name: userData.name || "",
        email: userData.email || "",
      });
    } catch (err) {
      setError(
            err.response?.data?.message || "Profile update failed"
        );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔹 Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle photo select (NO PREVIEW)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      if (photoFile) fd.append("profile_photo", photoFile);

      await api.put("/api/edit-profile", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Edit Profile
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
        {error}
        </Alert>
    )}
      {/* ✅ ALWAYS SHOW DB PROFILE PHOTO */}
      <Avatar
        src={
          user?.profile_photo
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
        {!user?.profile_photo && user?.name?.charAt(0)}
      </Avatar>

      <Button component="label" fullWidth sx={{ mb: 2 }}>
        Change Photo
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </Button>

      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        value={form.email}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
}
