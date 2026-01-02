import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" component="div">
              <Button
                component={Link}
                to="/dashboard"
                color="inherit"
              >Admin Panel</Button>
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {token && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={logout}
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
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar> 
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#222",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};
