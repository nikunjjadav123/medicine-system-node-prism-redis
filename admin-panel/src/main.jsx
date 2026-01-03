import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeModeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </AuthProvider>
  </React.StrictMode>
);
