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
import Avatar from "./Avatar";

// Icons
import { X, SendHorizontal, MessageCircle } from "lucide-react";

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

    const thisPostComments = comments.filter(c => p._id === c.postId);

    const submitComment = async (e) => {
        e.preventDefault();
        await handleSubmit(e, (data) => addComment(p._id, data));
        resetForm();
    };

    return (
        <section
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4"
            onClick={() => setCommentsModalPost(false)}
        >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

            <div
                className="card relative z-10 flex max-h-[85vh] w-full max-w-lg animate-scale-in flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="text-base font-semibold">Comments</h2>
                    <button
                        onClick={() => setCommentsModalPost(false)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Original post */}
                <div className="border-b border-line px-5 py-4">
                    <div className="mb-3 flex items-center gap-3">
                        <Avatar src={p.authorId.image?.url} name={p.authorId.name} size={40} />
                        <div>
                            <p className="text-sm font-semibold text-ink">{p.authorId.name}</p>
                            <p className="text-xs text-faint">
                                {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    {p.content && (
                        <p className="mb-3 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-body">
                            {p.content}
                        </p>
                    )}
                    {p.images?.length >= 1 && (
                        <div className="flex flex-wrap gap-2">
                            {p.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    alt="post media"
                                    className="max-h-48 rounded-lg border border-line object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Comments list */}
                <div className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4">
                    {thisPostComments.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-8 text-center">
                            <MessageCircle size={26} className="text-faint" />
                            <p className="text-sm text-muted">No comments yet</p>
                            <p className="text-xs text-faint">Be the first to share your thoughts.</p>
                        </div>
                    ) : (
                        thisPostComments.map((c, index) => (
                            <div key={index} className="rounded-xl bg-surface-muted p-3">
                                {editedCommentId === c._id ? (
                                    <EditComment
                                        setEditedCommentId={setEditedCommentId}
                                        c={c}
                                        p={p}
                                    />
                                ) : (
                                    <div>
                                        <div className="mb-1.5 flex items-center gap-2">
                                            <Avatar
                                                src={c.authorId?.image?.url}
                                                name={c.authorId?.name || "?"}
                                                size={28}
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-ink">
                                                    {c.authorId?.name || "Unknown"}
                                                </p>
                                                <p className="text-[11px] text-faint">
                                                    {formatDistanceToNow(new Date(c.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="whitespace-pre-wrap wrap-break-word pl-9 text-sm leading-relaxed text-body">
                                            {c.content}
                                        </p>
                                        {c.authorId?._id === user._id && (
                                            <div className="mt-2 flex gap-3 pl-9">
                                                <button
                                                    onClick={() => setEditedCommentId(c._id)}
                                                    className="cursor-pointer text-xs font-medium text-muted transition-colors hover:text-primary"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteComment(c._id, p._id)}
                                                    className="cursor-pointer text-xs font-medium text-muted transition-colors hover:text-danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Composer */}
                <div className="border-t border-line px-5 py-4">
                    <form onSubmit={submitComment} className="flex items-center gap-2">
                        <input
                            type="text"
                            name="content"
                            placeholder="Write a comment…"
                            value={formData.content}
                            onChange={handleChange}
                            className="field h-10 px-4 text-sm"
                        />
                        <button
                            type="submit"
                            className="btn-primary h-10 w-10 shrink-0 px-0"
                            aria-label="Send comment"
                        >
                            <SendHorizontal size={17} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
});

export default Comments;
