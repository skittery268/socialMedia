// React Tools
import { memo, useEffect, useState } from "react";

// To format comment date
import { formatDistanceToNow } from "date-fns";

// Hooks
import { useComment } from "../hooks/useComment";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";

// Components
import EditComment from "./EditComment";

// Comment component
const Comments = memo(({ p, setCommentsModalPost }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });
    const { comments, deleteComment, addComment, getComments } = useComment();
    const { user } = useAuth();
    const [editedCommentId, setEditedCommentId] = useState(null);

    useEffect(() => {
        getComments();
    }, [getComments]);

    const thisPostComments = comments.filter(c => p._id === c.postId)

    const submitComment = async (e) => {
        e.preventDefault();
        await handleSubmit(e, (data) => addComment(p._id, data));
        resetForm();
    };

    return (
        <section 
            className="fixed inset-0 z-50 flex justify-center items-center" 
            onClick={() => setCommentsModalPost(false)}
        >
            <div className="absolute inset-0 bg-black/50" />
            
            <div 
                className="relative z-10 w-130 max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
                    <button 
                        onClick={() => setCommentsModalPost(false)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
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
                    <p className="text-gray-700 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap mb-3">{p.content}</p>
                    {
                        p.images.length >= 1 && (
                            <div className="flex flex-wrap gap-2">
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
                </div>

                <div className="max-h-60 overflow-y-auto p-4 space-y-3">
                    {
                        thisPostComments.map((c, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                                {
                                    editedCommentId === c._id ? (
                                        <EditComment setEditedCommentId={setEditedCommentId} c={c} p={p} />
                                    ) : (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                {
                                                    c.authorId?.image ? (
                                                        <img 
                                                            src={c.authorId.image.url} 
                                                            className="w-6 h-6 rounded-full object-cover" 
                                                            alt={c.authorId.name}
                                                        />
                                                    ) : (
                                                        <div className="bg-linear-to-r from-blue-400 to-red-400 w-6 h-6 rounded-full flex justify-center items-center">
                                                            <p className="text-[8px] text-white font-bold">{c.authorId?.name?.[0] || '?'}</p>
                                                        </div>
                                                    )
                                                }
                                                <div>
                                                    <p className="font-medium text-gray-800 text-sm">{c.authorId?.name || 'Unknown'}</p>
                                                    <p className="text-[12px] text-gray-400">{ formatDistanceToNow(new Date(c.createdAt), { addSuffix: true }) }</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap mb-2">{c.content}</p>
                                            {c.authorId?._id === user._id && (
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => setEditedCommentId(c._id)} 
                                                        className="text-xs text-blue-500 cursor-pointer hover:text-blue-700 font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteComment(c._id, p._id)} 
                                                        className="text-xs text-red-500 cursor-pointer hover:text-red-700 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="p-4 border-t border-gray-200">
                    <form onSubmit={submitComment} className="flex gap-2">
                        <input 
                            type="text" 
                            name="content" 
                            placeholder="Write a comment..." 
                            value={formData.content} 
                            onChange={handleChange}
                            className="flex-1 px-4 py-2 bg-[#F8FAFC] border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-sm"
                        />
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 font-medium text-sm"
                        >
                            Comment
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
});

export default Comments;