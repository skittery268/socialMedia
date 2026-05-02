// React Tools
import { useContext } from "react";

// Context
import { AuthContext } from "../context/AuthContext";

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

