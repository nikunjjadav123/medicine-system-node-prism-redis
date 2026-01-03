import { useAuth } from "../context/AuthContext";

const SuperAdminOnly = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "SUPER_ADMIN" ? children : null;
};

export default SuperAdminOnly;
