// React Tools
import { useContext } from "react";

// Context
import { ChatContext } from "../context/ChatContext";

// Hook to use chat context
export const useChat = () => useContext(ChatContext);

