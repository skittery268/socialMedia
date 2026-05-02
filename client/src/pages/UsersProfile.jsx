// React Tools
import { useEffect } from "react"

// React Router
import { Link, useParams } from "react-router";

// Hooks
import { useUser } from "../hooks/useUser";
import { useChat } from "../hooks/useChat";

// Components
import Loading from "../components/Loading";

// Any user profile page
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

    // Check if chat already exist between logged in user and user of this profile
    const isExist = chats.find(c => c.user1._id.toString() === id || c.user2._id.toString() === id);

    return (
        <>
            <p>{user.name}</p>
            {
                // If chat exist, show go to chat link, otherwise show start chat link
                isExist ? <Link to={`/chat/${isExist._id}`} onClick={() => openChat(id)}>Go to chat</Link> : <Link onClick={() => { addChat(id); openChat(id) }} to={`/chat/${id}`}>Start chat</Link>
            }
        </>
    )
}

export default UsersProfile;