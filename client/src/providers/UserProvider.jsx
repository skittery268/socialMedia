import { useState } from "react"
import { UserContext } from "../context/UserContext"
import { fetchUserById } from "../services/UserService";

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async (id) => {
        try {
            const res = await fetchUserById(id);

            setUser(res.data.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <UserContext.Provider value={{ user, getUser }}>
            {children}
        </UserContext.Provider>
    )
}