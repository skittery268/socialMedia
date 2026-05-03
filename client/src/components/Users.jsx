// React Tools
import { useEffect } from "react";

// Hooks
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";

// React Router
import { Link } from "react-router";


// Users component to show all users and link to their profile
const Users = () => {
    const { users, getUsers } = useChat();
    const { user } = useAuth();

    useEffect(() => {
        getUsers();
    }, [getUsers])

    return (
        <>
            {
                users.map((u, index) => {
                    if (u._id !== user._id) {
                        return (
                            <div key={index}>
                                <Link to={`/usersprofile/${u._id}`}>{u.name}</Link>
                            </div>
                        )
                    }
                })
            }
        </>
    )
}

export default Users;