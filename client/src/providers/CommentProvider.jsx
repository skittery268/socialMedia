import { useState } from "react"
import { CommentContext } from "../context/CommentContext"
import { toast } from "react-toastify";
import { fetchAddComment, fetchComments, fetchDeleteComment, fetchEditComment } from "../services/CommentService";
import { usePost } from "../hooks/usePost";

export const CommentProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const { getPosts } = usePost();

    const getComments = async () => {
        try {
            const res = await fetchComments();

            setComments(res.data.data.comments);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const addComment = async (postId, data) => {
        try {
            const res = await fetchAddComment(postId, data);

            setComments(prev => [...prev, res.data.data.comment]);
            getPosts();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const deleteComment = async (commentId, postId) => {
        try {
            await fetchDeleteComment(commentId, postId);

            setComments(prev => prev.filter(c => c._id !== commentId));
            getPosts();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const editComment = async (commentId, postId, data) => {
        try {
            await fetchEditComment(commentId, postId, data);

            getComments();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <CommentContext.Provider value={{ comments, getComments, addComment, deleteComment, editComment }}>
            {children}
        </CommentContext.Provider>
    )
}