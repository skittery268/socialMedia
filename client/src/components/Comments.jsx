import { useEffect, useState } from "react";
import { useComment } from "../hooks/useComment";
import { useForm } from "../hooks/useForm";

const Comments = ({ p }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });
    const [commentedPostId, setCommentedPostId] = useState(null);
    const [editedCommentId, setEditedCommentId] = useState(null);
    const { comments, deleteComment, addComment, getComments, editComment } = useComment();

    useEffect(() => {
        getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <button onClick={() => setCommentedPostId(p._id)}>Comment {p.commentCount}</button>

            {
                commentedPostId === p._id && (
                    <form onSubmit={(e) => { handleSubmit(e, (data) => addComment(p._id, data)); resetForm(); setCommentedPostId(null) }}>
                        <input type="text" name="content" placeholder="Enter comment" value={formData.content} onChange={handleChange} />
                        <button>Comment</button>
                        <button onClick={() => setCommentedPostId(null)}>Cancel</button>
                    </form>
                )
            }

            {
                comments.map((c, index) => {
                    if (p._id === c.postId) {
                        return (
                            <section key={index}>
                                {
                                    editedCommentId === c._id ? (
                                        <form onSubmit={(e) => { handleSubmit(e, (data) => editComment(c._id, p._id, data)); resetForm(); setEditedCommentId(null) }}>
                                            <input type="text" name="content" placeholder="Edit comment" value={formData.content} onChange={handleChange} />
                                            <button>Edit</button>
                                            <button onClick={() => setEditedCommentId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <>
                                            <div key={index}>
                                                <p>{c.content}</p>
                                                <button onClick={() => setEditedCommentId(c._id)}>Edit</button>
                                                <button onClick={() => deleteComment(c._id, p._id)}>Delete</button>
                                            </div>
                                        </>
                                    )
                                }
                            </section>
                        )
                    }
                })
            }
        </>
    )
}

export default Comments;