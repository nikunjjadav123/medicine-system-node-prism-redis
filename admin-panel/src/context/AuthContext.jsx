import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // On page reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setUser(jwtDecode(token));
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  // 🔥 MUST be used after login
  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded); // <-- instant navbar update
    } catch (err) {
      console.error("Login token invalid", err);
    }
  };

  const logout = async () => {
  try {
    await api.post("/api/logout");
  } catch (error) {
    // 401 / already logged out / token expired → OK
    console.warn("Backend logout skipped:", error.response?.status);
  } finally {
    localStorage.removeItem("token");
    setUser(null);
  }
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
