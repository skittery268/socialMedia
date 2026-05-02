// React Tools
import { useContext } from "react";

// Context
import { PostContext } from "../context/PostContext";

// Hook to use post context
export const usePost = () => useContext(PostContext);

