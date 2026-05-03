// React Tools
import { useEffect } from "react"

// React Router
import { Link, useParams } from "react-router";

// Hooks
import { useUser } from "../hooks/useUser";
import { useChat } from "../hooks/useChat";
import { useFriend } from "../hooks/useFriend";

// Components
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

// Any user profile page
const UsersProfile = () => {
    const { id } = useParams();
    const { user: authUser } = useAuth();
    const { user, getUser } = useUser();
    const { chats, openChat, getUserChats } = useChat();
    const { friends, friendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest, removeFriend, getFriendRequests, getFriends } = useFriend();

    useEffect( () => {
        getUser(id);
        getUserChats();
        getFriendRequests();
        getFriends();
    }, [getFriendRequests, getFriends, getUser, getUserChats, id]);

    if (!user) {
        return <Loading />
    }

    // Check if chat already exist between logged in user and user of this profile
    const isExist = chats.find(c => c.user1._id.toString() === id || c.user2._id.toString() === id);

    const isFriendRequestSent = friendRequests.find(fr => (fr.from._id === authUser._id && fr.to._id === id) || (fr.from._id === id && fr.to._id === authUser._id));
    const isFriend = friends.find(f => (f.user1._id === authUser._id && f.user2._id === id) || (f.user1._id === id && f.user2._id === authUser._id));

    return (
        <>
            <p>{user.name}</p>
            {
                // If chat exist, show go to chat link, otherwise show start chat link
                isExist ? <Link to={`/chat/${isExist._id}`} onClick={() => openChat(id)}>Go to chat</Link> : <Link onClick={() => openChat(id)} to={`/chat/${id}`}>Start chat</Link>
            }
            
            {
                isFriendRequestSent ? (
                    <>
                        {
                            isFriendRequestSent.from._id === authUser._id ? (
                                <>
                                    <button onClick={() => cancelFriendRequest(isFriendRequestSent._id)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => acceptFriendRequest(isFriendRequestSent._id)}>Accept</button>
                                    <button onClick={() => rejectFriendRequest(isFriendRequestSent._id)}>Reject</button>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            isFriend ? (
                                <>
                                    <p>Friends</p>
                                    <button onClick={() => removeFriend(isFriend._id)}>Remove Friend</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => sendFriendRequest(id)}>Send Friend Request</button>
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default UsersProfile;