// Hooks
import { memo, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFriend } from "../hooks/useFriend";

// Format date
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

// Components
import Avatar from "./Avatar";

// Icons
import { Bell } from "lucide-react";

// Notifications component
const Notifications = memo(({ setIsOpen }) => {
    const { friendRequests, acceptFriendRequest, rejectFriendRequest, getFriendRequests } = useFriend();
    const { user } = useAuth();

    useEffect(() => {
        getFriendRequests();
    }, [getFriendRequests]);

    const friendRequestsForAuthUser = friendRequests.filter(fr => fr.to._id === user._id);

    return (
        <section className="absolute right-0 top-12 z-50 w-80 origin-top-right animate-scale-in overflow-hidden rounded-2xl border border-line bg-surface shadow-lg sm:w-96">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <h2 className="text-sm font-semibold text-ink">Notifications</h2>
                {friendRequestsForAuthUser.length > 0 && (
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">
                        {friendRequestsForAuthUser.length} new
                    </span>
                )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
                {friendRequestsForAuthUser.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                        <Bell size={24} className="text-faint" />
                        <p className="text-sm font-medium text-body">You&apos;re all caught up</p>
                        <p className="text-xs text-faint">New friend requests will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {friendRequestsForAuthUser.map((fr, index) => (
                            <div
                                key={index}
                                className="rounded-xl p-3 transition-colors hover:bg-surface-muted"
                            >
                                <div className="flex gap-3">
                                    <Link
                                        to={`/user/usersprofile/${fr.from._id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="shrink-0"
                                    >
                                        <Avatar src={fr.from.image?.url} name={fr.from.name} size={40} />
                                    </Link>
                                    <div className="min-w-0">
                                        <p className="text-sm leading-snug text-body">
                                            <Link
                                                to={`/user/usersprofile/${fr.from._id}`}
                                                onClick={() => setIsOpen(false)}
                                                className="font-semibold text-ink hover:underline"
                                            >
                                                {fr.from.name}
                                            </Link>{" "}
                                            sent you a friend request.
                                        </p>
                                        <p className="mt-0.5 text-xs text-faint">
                                            {formatDistanceToNow(new Date(fr.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2.5 flex gap-2 pl-13">
                                    <button
                                        onClick={() => acceptFriendRequest(fr._id)}
                                        className="btn-primary h-8 flex-1 text-xs"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => rejectFriendRequest(fr._id)}
                                        className="btn-ghost h-8 flex-1 text-xs"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
});

export default Notifications;
