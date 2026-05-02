import { Link, useParams } from "react-router";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useChat } from "../hooks/useChat";

const UsersProfile = () => {
    const { id } = useParams();
    const { user, getUser } = useUser();
    const { addChat, chats, openChat, getUserChats } = useChat();

    useEffect(() => {
        getUser(id);
        getUserChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!user) {
        return <Loading />
    }

    const isExist = chats.find(c => c.user1._id.toString() === id || c.user2._id.toString() === id);

    return (
        <>
            <p>{user.name}</p>
            {
                isExist ? <Link to={`/chat/${isExist._id}`} onClick={() => openChat(id)}>Go to chat</Link> : <Link onClick={() => { addChat(id); openChat(id) }} to={`/chat/${id}`}>Start chat</Link>
            }
        </>
    )
}

export default UsersProfile;