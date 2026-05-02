// React Tools
import { useState } from "react"

// Context
import { LikeContext } from "../context/LikeContext"

// Hooks
import { usePost } from "../hooks/usePost"
import { useAuth } from "../hooks/useAuth";

// Services
import { fetchLikePost, fetchLikes, fetchUnLike } from "../services/LikeService";

// Toastify
import { toast } from "react-toastify";


// Provider
export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState([]);
    const { getPosts } = usePost();
    const { user } = useAuth();

    // Function to get likes from server and set it to state
    const getLikes = async () => {
        try {
            const res = await fetchLikes();

            setLikes(res.data.data.likes);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to like post from server and add it to state
    const likePost = async (postId) => {
        try {
            const res = await fetchLikePost(postId, user._id);

            getPosts();
            setLikes(prev => [...prev, res.data.data.like]);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // const likeComment = async (commentId) => {
    //     try {
    //         const res = await fetchLikeComment(commentId, user._id);


    //     } catch (err) {
    //         toast.error(err.response.data.message);
    //     }
    // }

    // Function to unlike from server and remove it from state
    const unLike = async (likeId) => {
        try {
            await fetchUnLike(likeId);

            getPosts();
            setLikes(prev => prev.filter(l => l._id !== likeId));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <LikeContext.Provider value={{ likes, getLikes, likePost, unLike }}>
            {children}
        </LikeContext.Provider>
    )
}