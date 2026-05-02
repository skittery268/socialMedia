// React Tools
import { useContext } from "react";

// Context
import { MessageContext } from "../context/MessageContext";

// Hook to use message context
export const useMessage = () => useContext(MessageContext);

