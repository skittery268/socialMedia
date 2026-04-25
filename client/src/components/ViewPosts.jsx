import { useEffect, useState } from "react";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const ViewPosts = ({ mode }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });
    const { posts, getPosts, deletePost, editPost } = usePost();
    const { user } = useAuth();
    const [editedPostId, setEditedPostId] = useState(null);

    useEffect(() => {
        getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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