import { Box, Switch, Typography, Paper } from "@mui/material";
import { useThemeMode } from "../context/ThemeContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SuperAdminOnly from "../components/SuperAdminOnly";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function AppSettings() {
  const { mode, toggleTheme } = useThemeMode();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 🔥 Force logout from all devices
  const handleForceLogout = async () => {
    const confirmed = window.confirm(
      "This will log you out from all devices. Continue?"
    );

    if (!confirmed) return;
      try {
        await api.post("/api/force-logout-me");
      } catch (error) {
        console.warn("Force logout API returned 401 (expected)");
      } finally {
        await logout();
        navigate("/login");
      }

  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      {/* ---------------- App Settings ---------------- */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SettingsIcon sx={{ mr: 1 }} />
          <Typography variant="h5">App Settings</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography>
            Theme Mode ({mode === "light" ? "Light" : "Dark"})
          </Typography>

          <Switch checked={mode === "dark"} onChange={toggleTheme} />
        </Box>
      </Paper>

      {/* ---------------- Account & Security ---------------- */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LockOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="h5">Account & Security Settings</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography
            component={Link}
            to="/change-password"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Change admin password
          </Typography>

          <Typography
            onClick={handleForceLogout}
            sx={{
              color: "error.main",
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Force logout all sessions
          </Typography>

          <SuperAdminOnly>
            <Typography sx={{ color: "text.primary" }}>
              IP allowlist / blocklist
            </Typography>
          </SuperAdminOnly>
        </Box>
      </Paper>

      {/* ---------------- Super Admin Only Sections ---------------- */}
      <SuperAdminOnly>
        <Paper sx={{ p: 3, mt: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LanguageIcon sx={{ mr: 1 }} />
            <Typography variant="h5">Language & Region Settings</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography>Date format</Typography>
            <Typography>Time format</Typography>
            <Typography>Timezone</Typography>
            <Typography>Currency preference</Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <DangerousIcon sx={{ mr: 1 }} />
            <Typography variant="h5">Danger Zone</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography color="error">Delete all users</Typography>
            <Typography color="error">Clear database</Typography>
            <Typography color="error">Disable system access</Typography>
          </Box>
        </Paper>
      </SuperAdminOnly>
    </Box>
  );
}
