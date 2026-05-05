// React tools
import { useEffect } from "react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useFriend } from "../hooks/useFriend";

// Component to view friend list
const FriendList = () => {
    const { friends, removeFriend, getFriends } = useFriend();
    const { user } = useAuth();

    useEffect(() => {
        getFriends();
    }, [getFriends])

    return (
        <>
            {
                friends.length === 0 ? (
                    <p>You haven't friends :(</p>
                ) : (
                    friends.map((fr, index) => {
                        return (
                            <div key={index}>
                                <p>Friend: { fr.user1._id === user._id ? fr.user2.name : fr.user1.name }</p>
                                <button onClick={() => removeFriend(fr._id)}>Remove Friend</button>
                            </div>
                        )
                    })
                )
            }
        </>
    )
}

export default FriendList;