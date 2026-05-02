// React Tools
import { useContext } from "react";

// Context
import { CommentContext } from "../context/CommentContext";

// Hook to use comment context
export const useComment = () => useContext(CommentContext);

