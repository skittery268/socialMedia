// React Tools
import { useContext } from "react";

// Context
import { FriendContext } from "../context/FriendContext";

// Hook to use friend context
export const useFriend = () => useContext(FriendContext);

