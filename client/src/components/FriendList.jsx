// React tools
import { memo, useEffect } from "react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useFriend } from "../hooks/useFriend";
import { Link } from "react-router";

// Components
import Avatar from "./Avatar";

// Icons
import { UsersRound } from "lucide-react";

// Component to view friend list
const FriendList = memo(() => {
    const { friends, getFriends } = useFriend();
    const { user } = useAuth();

    useEffect(() => {
        getFriends();
    }, [getFriends]);

    return (
        <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold">Friends</h2>
                <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted">
                    {friends.length}
                </span>
            </div>

            {friends.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <UsersRound size={24} className="text-faint" />
                    <p className="text-sm text-muted">No friends yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                    {friends.map((fr, index) => {
                        const thisUser = fr.user1._id === user._id ? fr.user2 : fr.user1;
                        return (
                            <Link
                                key={index}
                                to={`/user/usersprofile/${thisUser._id}`}
                                className="group flex flex-col gap-2"
                            >
                                <div className="aspect-square overflow-hidden rounded-xl">
                                    <Avatar
                                        src={thisUser.image?.url}
                                        name={thisUser.name}
                                        fill
                                        shape="square"
                                        className="transition-transform duration-200 group-hover:scale-[1.03]"
                                    />
                                </div>
                                <span className="truncate text-sm font-medium text-body group-hover:text-primary">
                                    {thisUser.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
});

export default FriendList;
