import { api } from "../api/Axios"

export const fetchPosts = async () => {
    return await api.get("/posts/get-posts");
}

export const fetchAddPost = async (data) => {
    return await api.post("/posts/add-post", data);
}

export const fetchDeletePost = async (postId) => {
    return await api.delete(`/posts/delete-post/${postId}`);
}

export const fetchEditPost = async (data, postId) => {
    return await api.patch(`/posts/edit-post/${postId}`, data);
}