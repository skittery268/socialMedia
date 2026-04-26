import { useEffect, useState } from "react";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useLike } from "../hooks/useLike";
import Comments from "./Comments";

const ViewPosts = ({ mode }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });
    const { likes, likePost, getLikes, unLike } = useLike();
    const { posts, getPosts, deletePost, editPost } = usePost();
    const { user } = useAuth();
    const [editedPostId, setEditedPostId] = useState(null);
    

    useEffect(() => {
        getPosts();
        getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <>
                        {
                            posts.map((p, index) => {
                                if (p.authorId._id === user._id) {
                                    return (
                                        <section key={index}>
                                            {
                                                p._id === editedPostId ? (
                                                    <form onSubmit={(e) => { handleSubmit(e, (data) => editPost(p._id, data)); resetForm(); setEditedPostId(null) }}>
                                                        <input type="text" name="content" placeholder="Enter post content" value={formData.content} onChange={handleChange} />
                                                        <button>Edit</button>
                                                        <button onClick={() => setEditedPostId(null)}>Cancel</button>
                                                    </form>
                                                ) : (
                                                    <div>
                                                        <p>{p.authorId.name}</p>
                                                        <p>{p.content}</p>
                                                        <button onClick={() => likeOrUnLikePost(p)}>{p.likeCount}</button>
                                                        <button onClick={() => setEditedPostId(p._id)}>Edit</button>
                                                        <button onClick={() => deletePost(p._id)}>Delete</button>
                                                        {
                                                            p.images.length >= 1 && (
                                                                p.images.map(img => {
                                                                    return (
                                                                        <img src={img.url} width={200} alt="postImage" />
                                                                    )
                                                                })
                                                            )
                                                        }

                                                        <Comments p={p} />
                                                    </div>
                                                )
                                            }
                                        </section>
                                    )
                                }
                            })
                        }
                    </>
                ) : (
                    <>
                        {
                            posts.map((p, index) => {
                                return (
                                    <div key={index}>
                                        <p>{p.authorId.name}</p>
                                        <p>{p.content}</p>
                                        <button onClick={() => likeOrUnLikePost(p)}>{p.likeCount}</button>
                                        { p.authorId._id === user._id && <button onClick={() => deletePost(p._id)}>Delete</button> }
                                        {
                                            p.images.length >= 1 && (
                                                p.images.map(img => {
                                                    return (
                                                        <img src={img.url} width={200} alt="postImage" />
                                                    )
                                                })
                                            )
                                        }

                                        <Comments p={p} />
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }
        </>
    )
}

export default ViewPosts;