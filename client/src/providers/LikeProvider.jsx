import { toast } from "react-toastify";
import { LikeContext } from "../context/LikeContext"
import { usePost } from "../hooks/usePost"
import { fetchLikePost, fetchLikes, fetchUnLike } from "../services/LikeService";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState([]);
    const { getPosts } = usePost();
    const { user } = useAuth();

    const getLikes = async () => {
        try {
            const res = await fetchLikes();

            setLikes(res.data.data.likes);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

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