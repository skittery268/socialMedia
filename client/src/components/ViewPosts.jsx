// React Tools
import { memo, useEffect, useState } from "react";

// To format post date
import { formatDistanceToNow } from "date-fns";

// Hooks
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useLike } from "../hooks/useLike";

// Components
import Comments from "./Comments";
import { useSearch } from "../hooks/useSearch";

// ViewPosts component to show all posts and allow liking, editing, and deleting posts
const ViewPosts = memo(({ mode }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });
    const { likes, likePost, getLikes, unLike } = useLike();
    const { getPosts, deletePost, editPost } = usePost();
    const { user } = useAuth();
    const { searchedPosts } = useSearch();
    const [editedPostId, setEditedPostId] = useState(null);
    const [commentsModalPost, setCommentsModalPost] = useState(null);
    
    useEffect(() => {
        getPosts();
        getLikes();
    }, [getLikes, getPosts]);

    const likeOrUnLikePost = (p) => {
        const like = likes.find(l => l.authorId === user._id && l.postId === p._id);

        if (like) {
            return unLike(like._id);
        } else {
            return likePost(p._id)
        }
    }

    return (
        <>
            {
                mode === "profile" ? (
                    <div className="w-135 flex flex-col gap-4 mt-4">
                        {
                            searchedPosts.map((p, index) => {
                                if (p.authorId._id === user._id) {
                                    return (
                                        <section key={index} className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition duration-200">
                                            {
                                                p._id === editedPostId ? (
                                                    <>
                                                        <div className="p-4 flex items-center gap-3 pb-3 border-b border-gray-200">
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
                                                        <form onSubmit={(e) => { handleSubmit(e, (data) => editPost(p._id, data)); resetForm(); setEditedPostId(null) }} className="p-4 flex flex-col gap-3">
                                                            <input 
                                                                type="text" 
                                                                name="content" 
                                                                placeholder="Enter post content" 
                                                                value={formData.content} 
                                                                onChange={handleChange}
                                                                className="w-full px-4 py-2 bg-[#F8FAFC] border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button type="submit" className="flex-1 bg-blue-500 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-medium">Edit</button>
                                                                <button type="button" onClick={() => setEditedPostId(null)} className="flex-1 bg-gray-400 cursor-pointer text-white py-2 rounded-lg hover:bg-gray-500 transition duration-200 font-medium">Cancel</button>
                                                            </div>
                                                        </form>
                                                    </>
                                                ) : (
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
                                                                className="flex-1 py-2 text-sm cursor-pointer font-medium text-blue-500 hover:bg-blue-50 rounded-lg transition duration-200"
                                                            >
                                                                ❤️ Like ({p.likeCount})
                                                            </button>
                                                            <button 
                                                                onClick={() => setCommentsModalPost(p)}
                                                                className="flex-1 py-2 text-sm cursor-pointer font-medium text-green-500 hover:bg-green-50 rounded-lg transition duration-200"
                                                            >
                                                                💬 Comments ({p.commentCount})
                                                            </button>
                                                            <button 
                                                                onClick={() => setEditedPostId(p._id)}
                                                                className="flex-1 py-2 text-sm cursor-pointer font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200"
                                                            >
                                                                ✏️ Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => deletePost(p._id)}
                                                                className="flex-1 py-2 text-sm cursor-pointer font-medium text-red-500 hover:bg-red-50 rounded-lg transition duration-200"
                                                            >
                                                                🗑️ Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </section>
                                    )
                                }
                            })
                        }
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <div className="w-260 flex flex-col gap-4 mt-4">
                            {
                                searchedPosts.map((p, index) => {
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
                                                    <p className="font-semibold text-gray-800">{p.authorId.name}</p>
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
                                                    { p.authorId._id === user._id && (
                                                        <button 
                                                            onClick={() => deletePost(p._id)}
                                                            className="flex-1 py-2 px-3 text-sm cursor-pointer font-medium text-red-500 hover:bg-red-50 rounded-lg transition duration-200"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            {commentsModalPost && <Comments p={commentsModalPost} setCommentsModalPost={setCommentsModalPost} />}
        </>
    )
});

export default ViewPosts;