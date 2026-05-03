// Hooks
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFriend } from "../hooks/useFriend";

// Notifications component
const Notifications = () => {
    const { friendRequests, acceptFriendRequest, rejectFriendRequest, getFriendRequests } = useFriend();
    const { user } = useAuth();

    useEffect(() => {
        getFriendRequests()
    }, [getFriendRequests])

    const friendRequestsForAuthUser = friendRequests.filter(fr => fr.to._id === user._id);

    return (
        <>
            {
                friendRequestsForAuthUser.length === 0 ? (
                    <p>You haven't notifications</p>
                ) : (
                    <>
                        {
                            friendRequestsForAuthUser.map((fr, index) => {
                                return (
                                    <div key={index}>
                                        <p>Sender: {fr.from.name}</p>
                                        <button onClick={() => acceptFriendRequest(fr._id)}>Accept</button>
                                        <button onClick={() => rejectFriendRequest(fr._id)}>Reject</button>
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }
        </>
    )
}

export default Notifications;