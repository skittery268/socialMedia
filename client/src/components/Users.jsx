// React Tools
import { useEffect } from "react";

// Hooks
import { useChat } from "../hooks/useChat";

// React Router
import { Link } from "react-router";

// Users component to show all users and link to their profile
const Users = () => {
    const { users, getUsers } = useChat();

    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                users.map((u, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/usersprofile/${u._id}`}>{u.name}</Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Users;