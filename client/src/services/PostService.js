// Axios
import { api } from "../api/Axios"

// Service to fetch posts from server
export const fetchPosts = async () => {
    return await api.get("/posts/get-posts");
}

// Service to add post to server
export const fetchAddPost = async (data) => {
    return await api.post("/posts/add-post", data);
}

// Service to delete post from server
export const fetchDeletePost = async (postId) => {
    return await api.delete(`/posts/delete-post/${postId}`);
}

// Service to edit post from server
export const fetchEditPost = async (data, postId) => {
    return await api.patch(`/posts/edit-post/${postId}`, data);
}
