import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // If already logged in → go to dashboard
  return token ? <Navigate to="/dashboard" /> : children;
}
