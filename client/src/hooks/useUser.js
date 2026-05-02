// React Tools
import { useContext } from "react";

// Context
import { UserContext } from "../context/UserContext";

// Hook to use user context
export const useUser = () => useContext(UserContext);

