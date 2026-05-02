// React Tools
import { useContext } from "react";

// Context
import { LikeContext } from "../context/LikeContext";

// Hook to use like context
export const useLike = () => useContext(LikeContext);

