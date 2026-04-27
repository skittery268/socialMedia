import { useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { Link } from "react-router";

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