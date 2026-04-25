import { useState } from "react"
import { PostContext } from "../context/PostContext"
import { fetchAddPost, fetchDeletePost, fetchEditPost, fetchPosts } from "../services/PostService";
import { toast } from "react-toastify";

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const res = await fetchPosts();

            setPosts(res.data.data.posts);
        } catch (err) {
            console.log(err);
        }
    }

    const addPost = async (data) => {
        try {
            const res = await fetchAddPost(data);

            setPosts(prev => [...prev, res.data.data.post]);
            toast.success(res.data.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const deletePost = async (postId) => {
        try {
            const res = await fetchDeletePost(postId);

            setPosts(prev => prev.filter(p => p._id.toString() !== postId.toString()));
            toast.success(res.data.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const editPost = async (postId, data) => {
        try {
            const res = await fetchEditPost(data, postId);

            setPosts(prev => prev.map(p => p._id.toString() === postId.toString() ? res.data.data.post : p));
            toast.success(res.data.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <PostContext.Provider value={{ posts, getPosts, addPost, deletePost, editPost }}>
            {children}
        </PostContext.Provider>
    )
}