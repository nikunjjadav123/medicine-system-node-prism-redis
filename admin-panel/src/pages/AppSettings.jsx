import { Box, Switch, Typography, Paper } from "@mui/material";
import { useThemeMode } from "../context/ThemeContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SuperAdminOnly from "../components/SuperAdminOnly";
import { Link } from "react-router-dom";
export default function AppSettings() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SettingsIcon sx={{ mr: 1 }} />
          <Typography variant="h5">
            App Settings
          </Typography>
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

          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
          />
        </Box>
      </Paper>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LockOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="h5">
            Account & Security Settings
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            component={Link}
            to="/change-password"
            sx={{
              color: mode === "dark"
                ? "rgba(255, 255, 255, 0.87)"
                : "rgba(0, 0, 0, 0.87)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Change admin password
          </Typography>

          <Typography
            component={Link}
            to="/forge-logut-all"
            sx={{
              color: mode === "dark"
                ? "rgba(255, 255, 255, 0.87)"
                : "rgba(0, 0, 0, 0.87)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Force logout all sessions
          </Typography>    
         <SuperAdminOnly>
            <Typography>
              IP allowlist / blocklist
            </Typography>
         </SuperAdminOnly>  
        </Box>
      </Paper>
      <SuperAdminOnly>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LanguageIcon sx={{ mr: 1 }} />
              <Typography variant="h5">
                Language & Region Settings
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Typography>
                Date format (DD/MM/YYYY, MM/DD/YYYY)
              </Typography>
              <Typography>
                Time format (12h / 24h)
              </Typography>
              <Typography>
                Timezone
              </Typography>
              <Typography>
                Currency preference
              </Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <DangerousIcon sx={{ mr: 1 }} />
              <Typography variant="h5">
                Danger Zone
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Typography>
                Delete all users
              </Typography>
              <Typography>
                Clear database
              </Typography>
              <Typography>
                Disable system access
              </Typography>
            </Box>
          </Paper>
      </SuperAdminOnly>
    </Box>
  );
}
