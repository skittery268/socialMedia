// React Tools
import { memo } from "react";

// To format post date
import { formatDistanceToNow } from "date-fns";

// React Router
import { Link } from "react-router";

// Icons
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";

// Components
import Avatar from "./Avatar";

// Presentational post card shared by the feed, profile and admin views.
const PostCard = memo(({
    p,
    currentUserId,
    isLiked,
    onLike,
    onComment,
    onEdit,
    onDelete,
    canEdit = false,
    canDelete = false,
}) => {
    const authorLink =
        p.authorId._id === currentUserId
            ? "/user/profile"
            : `/user/usersprofile/${p.authorId._id}`;

    return (
        <article className="card overflow-hidden transition-shadow duration-200 hover:shadow-md">
            <div className="flex flex-col gap-3 p-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                    <Link
                        to={authorLink}
                        className="shrink-0 rounded-full transition-opacity hover:opacity-90"
                    >
                        <Avatar src={p.authorId.image?.url} name={p.authorId.name} size={42} />
                    </Link>
                    <div className="min-w-0">
                        <Link
                            to={authorLink}
                            className="block truncate text-sm font-semibold text-ink hover:underline"
                        >
                            {p.authorId.name}
                        </Link>
                        <p className="text-xs text-faint">
                            {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                </div>

                {/* Content */}
                {p.content && (
                    <p className="whitespace-pre-wrap wrap-break-word text-[15px] leading-relaxed text-body">
                        {p.content}
                    </p>
                )}

                {/* Media */}
                {p.images?.length >= 1 && (
                    <div
                        className={`grid gap-2 ${
                            p.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                        }`}
                    >
                        {p.images.map((img, i) => (
                            <img
                                key={i}
                                src={img.url}
                                alt="post media"
                                className="max-h-[28rem] w-full rounded-xl border border-line object-cover"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 border-t border-line px-2 py-1.5">
                <button
                    onClick={onLike}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${
                        isLiked
                            ? "text-like hover:bg-danger-soft"
                            : "text-muted hover:bg-surface-muted hover:text-ink"
                    }`}
                >
                    <Heart size={17} fill={isLiked ? "currentColor" : "none"} />
                    {p.likeCount}
                </button>

                <button
                    onClick={onComment}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                >
                    <MessageCircle size={17} />
                    {p.commentCount}
                </button>

                {canEdit && (
                    <button
                        onClick={onEdit}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                )}

                {canDelete && (
                    <button
                        onClick={onDelete}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                    >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                    </button>
                )}
            </div>
        </article>
    );
});

export default PostCard;
