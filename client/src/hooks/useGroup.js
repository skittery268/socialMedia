// React Tools
import { useContext } from "react";

// Context
import { GroupContext } from "../context/GroupContext";

// Hook to use group context
export const useGroup = () => useContext(GroupContext);

