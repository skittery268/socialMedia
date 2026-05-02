// React Router
import { Navigate } from "react-router";

// Hooks
import { useAuth } from "../hooks/useAuth"

// ProtectedRoute component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to={"/login"} />
}

export default ProtectedRoute;