// Hooks
import { memo, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFriend } from "../hooks/useFriend";

// Format date
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

// Notifications component
const Notifications = memo(({ setIsOpen }) => {
    const { friendRequests, acceptFriendRequest, rejectFriendRequest, getFriendRequests } = useFriend();
    const { user } = useAuth();

    useEffect(() => {
        getFriendRequests()
    }, [getFriendRequests])

    const friendRequestsForAuthUser = friendRequests.filter(fr => fr.to._id === user._id);

    return (
        <section className="absolute top-15 -right-25 z-50 min-h-54 w-100 rounded-3xl border border-gray-200 bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center border-b border-gray-100 pb-3">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
                    <span className="text-sm text-gray-500">{friendRequestsForAuthUser.length}</span>
                </div>
            </div>

            <div className="min-h-54 max-h-150 overflow-y-auto overflow-x-hidden">
                {
                    friendRequestsForAuthUser.length === 0 ? (
                        <p className="text-sm text-gray-600">No new notifications.</p>
                    ) : (
                        <div className="space-y-3">
                            {friendRequestsForAuthUser.map((fr, index) => {
                                return (
                                    <div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                                        <div className="text-sm text-gray-800 flex gap-3 w-90">
                                            {
                                                fr.from.image ? (
                                                    <Link to={`/usersprofile/${fr.from._id}`} onClick={() => setIsOpen(false)} className="rounded-full ml-1 hover:bg-black h-10 w-10">
                                                        <img 
                                                            src={fr.from.image.url} 
                                                            alt="User avatar"
                                                            className="h-10 w-10 rounded-full hover:opacity-90 cursor-pointer"
                                                        />
                                                    </Link>
                                                ) : (
                                                    <Link to={`/usersprofile/${fr.from._id}`} onClick={() => setIsOpen(false)} className="ml-1 bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                                                        <p className="text-[12px] font-bold text-white">{fr.from.name[0]}</p>
                                                    </Link>
                                                )
                                            }
                                            <div>
                                                <p><Link to={`/usersprofile/${fr.from._id}`} onClick={() => setIsOpen(false)} className="hover:underline">{fr.from.name}</Link> <span className="text-gray-500">sent you a friend request.</span></p>
                                                <p className="text-[12px] text-gray-400">{ formatDistanceToNow(new Date(fr.createdAt), { addSuffix: true }) }</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => acceptFriendRequest(fr._id)}
                                                className="rounded-full bg-blue-600 px-3 py-1 cursor-pointer text-sm font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => rejectFriendRequest(fr._id)}
                                                className="rounded-full border border-gray-300 cursor-pointer bg-white px-3 py-1 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </section>
    )
})

export default Notifications;