// React Tools
import { useEffect, useState } from "react"

// React Router
import { Link, useParams } from "react-router";

// To format post date
import { formatDistanceToNow } from "date-fns";

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

// Any user profile page
const UsersProfile = () => {
    const { id } = useParams();
    const { user: authUser } = useAuth();
    const { user, getUser } = useUser();
    const { chats, openChat, getUserChats } = useChat();
    const { posts, getPosts } = usePost();
    const { friends, friendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest, removeFriend, getFriendRequests, getFriends } = useFriend();
    const { likes, likePost, getLikes, unLike } = useLike();
    const [commentsModalPost, setCommentsModalPost] = useState(null);

    useEffect( () => {
        getUser(id);
        getUserChats();
        getFriendRequests();
        getFriends();
        getLikes();
        getPosts();
    }, [getFriendRequests, getFriends, getUser, getUserChats, id, getLikes, getPosts]);

    if (!user) {
        return <Loading />
    }

    const likeOrUnLikePost = (p) => {
        const like = likes.find(l => l.authorId === authUser._id && l.postId === p._id);

        if (like) {
            return unLike(like._id);
        } else {
            return likePost(p._id)
        }
    }

    // Check if chat already exist between logged in user and user of this profile
    const isExist = chats.find(c => c.user1._id.toString() === id || c.user2._id.toString() === id);

    const isFriendRequestSent = friendRequests.find(fr => (fr.from._id === authUser._id && fr.to._id === id) || (fr.from._id === id && fr.to._id === authUser._id));
    const isFriend = friends.find(f => (f.user1._id === authUser._id && f.user2._id === id) || (f.user1._id === id && f.user2._id === authUser._id));

    const userPosts = posts.filter(p => p.authorId._id === user._id);

    console.log(userPosts);

    return (
        <section className="bg-[#F3F2EF] mt-10 w-full flex items-center flex-col min-h-200 pb-15">
            <div className="w-260 h-50 bg-[#E5E5E5] rounded-2xl"></div>
            <div className="bg-white w-260 h-50 -translate-y-5 rounded-b-2xl relative shadow">
                <div className="absolute left-10 flex justify-center items-center bg-center bg-cover rounded-full w-40 h-40 -top-20">
                    {
                        user.image ? (
                            <div className="w-full h-full rounded-full bg-center bg-cover flex justify-center items-center">
                                <img src={user.image.url} className="w-full h-full rounded-full bg-center bg-cover flex justify-center items-center" alt="user avatar" />
                            </div>
                        ) : (
                            <>
                                <div className="bg-linear-to-r from-blue-400 to-red-400 w-full h-full rounded-full flex justify-center items-center">
                                    <p className="text-[50px] text-white">{user.name[0]}</p>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="absolute left-60 flex justify-center flex-col">
                    <p className="text-[35px]">{user?.name}</p>
                </div>

                {
                    // If chat exist, show go to chat link, otherwise show start chat link
                    isExist ? (
                        <Link 
                            to={`/chat/${isExist._id}`} 
                            onClick={() => openChat(id)}
                            className="absolute right-5 text-[15px] bg-blue-500 hover:bg-blue-600 text-white rounded-full w-25 h-10 flex justify-center items-center top-2"
                            >
                            Go to chat
                        </Link> 
                    ) : ( 
                        <Link 
                            onClick={() => openChat(id)} 
                            to={`/chat/${id}`}
                            className="absolute right-5 text-[15px] bg-blue-500 hover:bg-blue-600 text-white rounded-full w-22 h-10 flex justify-center items-center top-2"
                            >
                            Start chat
                        </Link>
                    )
                }
                
                {
                    isFriendRequestSent ? (
                        <>
                            {
                                isFriendRequestSent.from._id === authUser._id ? (
                                    <div className="absolute bottom-5 right-5 flex justify-center items-center">
                                        <button 
                                            onClick={() => cancelFriendRequest(isFriendRequestSent._id)}
                                            className="bg-red-400 border border-red-300 h-10 w-50 rounded-full text-white cursor-pointer hover:bg-red-500 transition duration-200"
                                            >
                                            Cancel Friend Request
                                        </button>
                                    </div>
                                ) : (
                                    <div className="absolute bottom-5 right-5 flex justify-center items-center gap-5">
                                        <button 
                                            onClick={() => acceptFriendRequest(isFriendRequestSent._id)}
                                            className="bg-green-400 border border-green-300 h-10 w-50 rounded-full text-white cursor-pointer hover:bg-green-500 transition duration-200"
                                            >
                                            Accept Friend Request
                                        </button>
                                        <button 
                                            onClick={() => rejectFriendRequest(isFriendRequestSent._id)}
                                            className="bg-red-400 border border-red-300 h-10 w-50 rounded-full text-white cursor-pointer hover:bg-red-500 transition duration-200"
                                            >
                                            Reject Friend Request
                                            </button>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <>
                            {
                                isFriend ? (
                                    <div className="absolute bottom-5 right-5 flex justify-center items-center gap-5">
                                        <p className="bg-gray-400 border border-gray-300 h-10 w-30 rounded-full text-white flex justify-center items-center">Friends ✔️</p>
                                        <button 
                                            onClick={() => removeFriend(isFriend._id)}
                                            className="bg-red-400 border border-red-300 h-10 w-50 rounded-full text-white cursor-pointer hover:bg-red-500 transition duration-200"
                                            >
                                            Remove Friend
                                        </button>
                                    </div>
                                ) : (
                                    <div className="absolute bottom-5 right-5 flex justify-center items-center">
                                        <button 
                                            onClick={() => sendFriendRequest(id)}
                                            className="text-[15px] bg-blue-500 hover:bg-blue-600 text-white rounded-full w-50 cursor-pointer h-10 flex justify-center items-center"
                                            >
                                            Send Friend Request
                                        </button>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>

            <div className="w-260 flex flex-col gap-4">
                {
                    userPosts.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow p-8 flex justify-center items-center">
                            <p className="text-gray-400">No posts yet</p>
                        </div>
                    ) : (
                        userPosts.map((p, index) => {
                            return (
                                <div key={index} className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition duration-200">
                                    <div className="p-4 flex flex-col gap-3">
                                        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                                            {
                                                p.authorId.image ? (
                                                    <img 
                                                        src={p.authorId.image.url} 
                                                        className="w-10 h-10 rounded-full object-cover" 
                                                        alt={p.authorId.name}
                                                    />
                                                ) : (
                                                    <div className="bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                                                        <p className="text-[12px] text-white font-bold">{p.authorId.name[0]}</p>
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <p className="font-semibold text-gray-800">{p.authorId.name}</p>
                                                <p className="text-[12px] text-gray-400">{ formatDistanceToNow(new Date(p.createdAt), { addSuffix: true }) }</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">{p.content}</p>
                                        {
                                            p.images.length >= 1 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {
                                                        p.images.map((img, imgIndex) => {
                                                            return (
                                                                <img 
                                                                    key={imgIndex}
                                                                    src={img.url} 
                                                                    width={200} 
                                                                    alt="postImage"
                                                                    className="rounded-lg object-cover max-h-48"
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                        <div className="pt-3 border-t border-gray-200 flex gap-2">
                                            <button 
                                                onClick={() => likeOrUnLikePost(p)}
                                                className="flex-1 py-2 px-3 text-sm cursor-pointer font-medium text-blue-500 hover:bg-blue-50 rounded-lg transition duration-200"
                                            >
                                                ❤️ Like ({p.likeCount})
                                            </button>
                                            <button 
                                                onClick={() => setCommentsModalPost(p)}
                                                className="flex-1 py-2 px-3 text-sm cursor-pointer font-medium text-green-500 hover:bg-green-50 rounded-lg transition duration-200"
                                            >
                                                💬 Comments ({p.commentCount})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            {commentsModalPost && <Comments p={commentsModalPost} setCommentsModalPost={setCommentsModalPost} />}
        </section>
    )
}

export default UsersProfile;