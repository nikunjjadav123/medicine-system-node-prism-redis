import { Box, Switch, Typography, Paper } from "@mui/material";
import { useThemeMode } from "../context/ThemeContext";

export default function AppSettings() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          App Settings
        </Typography>

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
    </Box>
  );
}
