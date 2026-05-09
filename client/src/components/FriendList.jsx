// React tools
import { memo, useEffect } from "react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useFriend } from "../hooks/useFriend";
import { Link } from "react-router";

// Component to view friend list
const FriendList = memo(() => {
    const { friends, getFriends } = useFriend();
    const { user } = useAuth();

    useEffect(() => {
        getFriends();
    }, [getFriends])

    return (
        <section className="w-115 bg-white rounded-[20px] min-h-80 max-h-150 shadow">
            <h1 className="ml-5 pt-2 text-[27px]">Friends</h1>
            <h1 className="ml-5 text-gray-500">Friends: {friends.length}</h1>
            <div className="flex ml-5 items-center flex-wrap mt-3 gap-5">
                {
                    friends.length !== 0 && (
                        friends.map((fr, index) => {
                            const thisUser = fr.user1._id === user._id ? fr.user2 : fr.user1
                            return (
                                <div key={index}>
                                    {
                                        thisUser.image ? (
                                            <Link to={`/usersprofile/${thisUser._id}`}>
                                                <img src={thisUser.image.url} className="w-30 h-30 rounded-[10px] bg-center bg-cover" alt="user avatar" />
                                            </Link>
                                        ) : (
                                            <Link to={`/usersprofile/${thisUser._id}`}>
                                                <div className="bg-linear-to-r from-blue-400 to-red-400 w-30 h-30 rounded-[10px] flex justify-center items-center">
                                                    <p className="text-[40px] text-white">{thisUser.name[0]}</p>
                                                </div>
                                            </Link>
                                        )
                                    }
                                    <Link to={`/usersprofile/${thisUser._id}`} className="text-[13px] ml-1">{ thisUser.name }</Link>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </section>
    )
})

export default FriendList;