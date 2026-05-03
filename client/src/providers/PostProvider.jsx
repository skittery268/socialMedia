// React Tools
import { useCallback, useState } from "react"

// Context
import { PostContext } from "../context/PostContext"

// Services
import { fetchAddPost, fetchDeletePost, fetchEditPost, fetchPosts } from "../services/PostService";

// Toastify
import { toast } from "react-toastify";

// Provider
export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    // Function to get posts from server and set it to state
    const getPosts = useCallback(async () => {
        try {
            const res = await fetchPosts();

            setPosts(res.data.data.posts);
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Function to add post to server and set it to state
    const addPost = useCallback(async (data) => {
        try {
            const res = await fetchAddPost(data);

            setPosts(prev => [...prev, res.data.data.post]);
            toast.success(res.data.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to delete post from server and remove it from state
    const deletePost = useCallback(async (postId) => {
        try {
            const res = await fetchDeletePost(postId);

            setPosts(prev => prev.filter(p => p._id.toString() !== postId.toString()));
            toast.success(res.data.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to edit post from server and update it in state
    const editPost = useCallback(async (postId, data) => {
        try {
            const res = await fetchEditPost(data, postId);

            setPosts(prev => prev.map(p => p._id.toString() === postId.toString() ? res.data.data.post : p));
            toast.success(res.data.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    return (
        <PostContext.Provider value={{ posts, setPosts, getPosts, addPost, deletePost, editPost }}>
            {children}
        </PostContext.Provider>
    )
}