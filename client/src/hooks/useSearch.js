// React tools
import { useContext } from "react";

// Context
import { SearchContext } from "../context/SearchContext";

// Hook to use search context
export const useSearch = () => useContext(SearchContext);
