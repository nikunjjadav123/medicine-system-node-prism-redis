import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeModeProvider } from "./context/ThemeContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
     <ThemeModeProvider>
      <App />
     </ThemeModeProvider>
  </React.StrictMode>
);
