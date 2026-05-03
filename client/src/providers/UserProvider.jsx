// React Tools
import { useCallback, useState } from "react"

// Context
import { UserContext } from "../context/UserContext"

// Services
import { fetchUserById } from "../services/UserService";

// Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to get user by id from server and set it to state
    const getUser = useCallback(async (id) => {
        try {
            const res = await fetchUserById(id);

            setUser(res.data.data.user);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, getUser }}>
            {children}
        </UserContext.Provider>
    )
}