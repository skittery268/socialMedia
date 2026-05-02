// Socket
import { io } from "socket.io-client";

// Server URL from environment variables
const URL = import.meta.env.VITE_SOCKET_URL;

// Create socket connection with credentials
export const socket = io(URL, {
    withCredentials: true
});

