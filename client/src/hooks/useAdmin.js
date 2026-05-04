// React tools
import { useContext } from "react";

// Context
import { AdminContext } from "../context/AdminContext";

// Hook to use admin context
export const useAdmin = () => useContext(AdminContext);
