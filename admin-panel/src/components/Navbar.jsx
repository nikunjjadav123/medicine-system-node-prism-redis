import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo / Title */}
        <Typography variant="h6">
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
          >
            Admin Panel
          </Button>
        </Typography>

        {/* Right side */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {user ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>

              <Button
                component={Link}
                to="/profile"
                color="inherit"
              >
                Profile
              </Button>

              <Button
                component={Link}
                to="/settings"
                color="inherit"
              >
                Settings
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
            >
              Login
            </Button>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}
