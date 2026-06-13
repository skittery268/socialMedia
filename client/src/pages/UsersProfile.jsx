// React Tools
import { useEffect, useState } from "react";

// React Router
import { useParams, useNavigate } from "react-router";

// Hooks
import { useUser } from "../hooks/useUser";
import { useChat } from "../hooks/useChat";
import { useFriend } from "../hooks/useFriend";
import { useAuth } from "../hooks/useAuth";
import { usePost } from "../hooks/usePost";
import { useLike } from "../hooks/useLike";

// Components
import Loading from "../components/Loading";
import Comments from "../components/Comments";
import Avatar from "../components/Avatar";
import PostCard from "../components/PostCard";

// Icons
import {
    MessageSquare,
    UserPlus,
    UserCheck,
    UserX,
    Check,
    Clock,
} from "lucide-react";

// Any user profile page
const UsersProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: authUser } = useAuth();
    const { user, getUser } = useUser();
    const { openChat, getUserChats } = useChat();
    const { posts, getPosts } = usePost();
    const { friends, friendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest, removeFriend, getFriendRequests, getFriends } = useFriend();
    const { likes, likePost, getLikes, unLike } = useLike();
    const [commentsModalPost, setCommentsModalPost] = useState(null);

    useEffect(() => {
        getUser(id);
        getUserChats();
        getFriendRequests();
        getFriends();
        getLikes();
        getPosts();
    }, [getFriendRequests, getFriends, getUser, getUserChats, id, getLikes, getPosts]);

    if (!user) {
        return <Loading />;
    }

    const isLiked = (p) =>
        likes.some((l) => l.authorId === authUser._id && l.postId === p._id);

    const likeOrUnLikePost = (p) => {
        const like = likes.find((l) => l.authorId === authUser._id && l.postId === p._id);

        if (like) {
            return unLike(like._id);
        } else {
            return likePost(p._id);
        }
    };

    const isFriendRequestSent = friendRequests.find(fr => (fr.from._id === authUser._id && fr.to._id === id) || (fr.from._id === id && fr.to._id === authUser._id));
    const isFriend = friends.find(f => (f.user1._id === authUser._id && f.user2._id === id) || (f.user1._id === id && f.user2._id === authUser._id));

    const userPosts = posts.filter(p => p.authorId._id === user._id);

    const goToChat = () => {
        openChat(id);
        navigate(`/user/chat/${id}`);
    };

    return (
        <section className="w-full">
            <div className="mx-auto w-full max-w-3xl px-4 py-6">
                {/* Header */}
                <div className="card overflow-hidden">
                    <div className="h-36 bg-linear-to-br from-primary-soft via-surface-muted to-primary-soft sm:h-44" />
                    <div className="px-6 pb-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex items-end gap-4">
                                    <div className="-mt-14 shrink-0 rounded-full ring-4 ring-surface">
                                        <Avatar src={user.image?.url} name={user.name} size={112} />
                                    </div>
                                    <div className="pb-1">
                                        <h1 className="text-xl font-semibold tracking-tight">{user.name}</h1>
                                        {user.email && <p className="text-sm text-muted">{user.email}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                                <button onClick={goToChat} className="btn-ghost h-9 gap-1.5 px-4 text-sm">
                                    <MessageSquare size={16} />
                                    Message
                                </button>

                                {isFriendRequestSent ? (
                                    isFriendRequestSent.from._id === authUser._id ? (
                                        <button
                                            onClick={() => cancelFriendRequest(isFriendRequestSent._id)}
                                            className="btn-ghost h-9 gap-1.5 px-4 text-sm text-muted hover:text-danger"
                                        >
                                            <Clock size={16} />
                                            Cancel request
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => acceptFriendRequest(isFriendRequestSent._id)}
                                                className="btn-primary h-9 gap-1.5 px-4 text-sm"
                                            >
                                                <Check size={16} />
                                                Accept request
                                            </button>
                                            <button
                                                onClick={() => rejectFriendRequest(isFriendRequestSent._id)}
                                                className="btn-ghost h-9 gap-1.5 px-4 text-sm text-muted hover:text-danger"
                                            >
                                                <UserX size={16} />
                                                Reject
                                            </button>
                                        </>
                                    )
                                ) : isFriend ? (
                                    <>
                                        <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-success-soft px-3.5 text-sm font-medium text-success">
                                            <UserCheck size={16} />
                                            Friends
                                        </span>
                                        <button
                                            onClick={() => removeFriend(isFriend._id)}
                                            className="btn-ghost h-9 gap-1.5 px-4 text-sm text-muted hover:text-danger"
                                        >
                                            <UserX size={16} />
                                            Remove
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => sendFriendRequest(id)}
                                        className="btn-primary h-9 gap-1.5 px-4 text-sm"
                                    >
                                        <UserPlus size={16} />
                                        Add friend
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts */}
                <div className="mt-6 flex flex-col gap-4">
                    {userPosts.length === 0 ? (
                        <div className="card flex flex-col items-center gap-1 px-6 py-14 text-center">
                            <p className="text-sm font-medium text-body">No posts yet</p>
                            <p className="text-xs text-faint">
                                {user.name.split(" ")[0]} hasn&apos;t shared anything.
                            </p>
                        </div>
                    ) : (
                        userPosts.map((p) => (
                            <PostCard
                                key={p._id}
                                p={p}
                                currentUserId={authUser._id}
                                isLiked={isLiked(p)}
                                onLike={() => likeOrUnLikePost(p)}
                                onComment={() => setCommentsModalPost(p)}
                            />
                        ))
                    )}
                </div>
            </div>

            {commentsModalPost && (
                <Comments p={commentsModalPost} setCommentsModalPost={setCommentsModalPost} />
            )}
        </section>
    );
};

export default UsersProfile;
