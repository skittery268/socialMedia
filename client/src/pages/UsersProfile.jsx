import { useParams } from "react-router";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useChat } from "../hooks/useChat";

const UsersProfile = () => {
    const { id } = useParams();
    const { user, getUser } = useUser();
    const { addChat } = useChat();

    useEffect(() => {
        getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!user) {
        return <Loading />
    }

    return (
        <>
            <p>{user.name}</p>
            <button onClick={() => addChat(id)}>Chat</button>
        </>
    )
}

export default UsersProfile;