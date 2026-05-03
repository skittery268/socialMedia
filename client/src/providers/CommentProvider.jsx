// React Tools
import { useCallback, useState } from "react"

// Context
import { CommentContext } from "../context/CommentContext"

// Services
import { fetchAddComment, fetchComments, fetchDeleteComment, fetchEditComment } from "../services/CommentService";

// Toastify
import { toast } from "react-toastify";

// Hooks
import { usePost } from "../hooks/usePost";

// Provider
export const CommentProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const { getPosts } = usePost();

    // Function to get comments from server and set it to state
    const getComments = useCallback(async () => {
        try {
            const res = await fetchComments();

            setComments(res.data.data.comments);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to add comment to server and set it to state
    const addComment = useCallback(async (postId, data) => {
        try {
            const res = await fetchAddComment(postId, data);

            setComments(prev => [...prev, res.data.data.comment]);
            getPosts();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, [getPosts]);

    // Function to delete comment from server and remove it from state
    const deleteComment = useCallback(async (commentId, postId) => {
        try {
            await fetchDeleteComment(commentId, postId);

            setComments(prev => prev.filter(c => c._id !== commentId));
            getPosts();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, [getPosts]);

    // Function to edit comment from server and update it in state
    const editComment = useCallback(async (commentId, postId, data) => {
        try {
            await fetchEditComment(commentId, postId, data);

            getComments();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, [getComments]);

    return (
        <CommentContext.Provider value={{ comments, getComments, addComment, deleteComment, editComment }}>
            {children}
        </CommentContext.Provider>
    )
}