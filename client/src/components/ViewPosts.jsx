// React Tools
import { memo, useEffect, useState } from "react";

// Hooks
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useLike } from "../hooks/useLike";
import { useSearch } from "../hooks/useSearch";

// Components
import Comments from "./Comments";
import PostCard from "./PostCard";
import Avatar from "./Avatar";

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

    const isLiked = (p) =>
        likes.some((l) => l.authorId === user._id && l.postId === p._id);

    const likeOrUnLikePost = (p) => {
        const like = likes.find((l) => l.authorId === user._id && l.postId === p._id);

        if (like) {
            return unLike(like._id);
        } else {
            return likePost(p._id);
        }
    };

    const visiblePosts =
        mode === "profile"
            ? searchedPosts.filter((p) => p.authorId._id === user._id)
            : searchedPosts;

    return (
        <>
            <div className="flex w-full flex-col gap-4">
                {visiblePosts.length === 0 && (
                    <div className="card flex flex-col items-center gap-1 px-6 py-14 text-center">
                        <p className="text-sm font-medium text-body">No posts yet</p>
                        <p className="text-xs text-faint">
                            When there&apos;s something new, it&apos;ll show up here.
                        </p>
                    </div>
                )}

                {visiblePosts.map((p) =>
                    mode === "profile" && p._id === editedPostId ? (
                        <article key={p._id} className="card animate-fade-in p-4">
                            <div className="mb-3 flex items-center gap-3">
                                <Avatar
                                    src={p.authorId.image?.url}
                                    name={p.authorId.name}
                                    size={42}
                                />
                                <div>
                                    <p className="text-sm font-semibold text-ink">
                                        {p.authorId.name}
                                    </p>
                                    <p className="text-xs text-faint">Editing post</p>
                                </div>
                            </div>
                            <form
                                onSubmit={(e) => {
                                    handleSubmit(e, (data) => editPost(p._id, data));
                                    resetForm();
                                    setEditedPostId(null);
                                }}
                                className="flex flex-col gap-3"
                            >
                                <textarea
                                    name="content"
                                    placeholder="Edit your post…"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="field min-h-24 resize-none px-4 py-3 text-sm leading-relaxed"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditedPostId(null)}
                                        className="btn-ghost h-9 px-4 text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary h-9 px-4 text-sm">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </article>
                    ) : (
                        <PostCard
                            key={p._id}
                            p={p}
                            currentUserId={user._id}
                            isLiked={isLiked(p)}
                            onLike={() => likeOrUnLikePost(p)}
                            onComment={() => setCommentsModalPost(p)}
                            onEdit={() => setEditedPostId(p._id)}
                            onDelete={() => deletePost(p._id)}
                            canEdit={mode === "profile"}
                            canDelete={
                                mode === "profile" ||
                                p.authorId._id === user._id ||
                                user.role === "admin"
                            }
                        />
                    )
                )}
            </div>

            {commentsModalPost && (
                <Comments p={commentsModalPost} setCommentsModalPost={setCommentsModalPost} />
            )}
        </>
    );
});

export default ViewPosts;
