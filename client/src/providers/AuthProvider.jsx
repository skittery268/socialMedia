// React Tools
import { useEffect, useState } from "react"

// Context
import { AuthContext } from "../context/AuthContext";

// Services
import { fetchLogin, fetchLogout, fetchMe, fetchRegister } from "../services/AuthService";

// Toastify
import { toast } from "react-toastify";

// React Router
import { useNavigate } from "react-router";

// Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Function to auto login
    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await fetchMe();

                setUser(res.data.data.user);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        getMe();
    }, []);

    // Function to login user
    const login = async (formData) => {
        try {
            const res = await fetchLogin(formData);

            setUser(res.data.data.user);
            navigate("/profile");
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to register new user
    const register = async (formData) => {
        try {
            const res = await fetchRegister(formData);

            navigate("/login");
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    
    // Function to logout (clear cookies section)
    const logout = async () => {
        try {
            const res = await fetchLogout()

            toast.success(res.data.message);
            setUser(null);
            navigate("/login");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <AuthContext.Provider value={{ loading, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}