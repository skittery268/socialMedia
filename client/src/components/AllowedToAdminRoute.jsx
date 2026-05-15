import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const AllowedToAdminRoute = ({ children }) => {
    const { user } = useAuth();

    return user.role === "admin" ? children : <Navigate to={"/user/profile"} />
}

export default AllowedToAdminRoute;