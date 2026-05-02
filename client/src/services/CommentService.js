// Axios
import { api } from "../api/axios"

// Service to fetch comments from server
export const fetchComments = async () => {
    return await api.get(`/comments/get-comments`);
}

// Service to add comment to post from server
export const fetchAddComment = async (postId, data) => {
    return await api.post(`/comments/add-comment/${postId}`, data);
}

// Service to delete comment from server
export const fetchDeleteComment = async (commentId, postId) => {
    return await api.delete(`/comments/delete-comment/${commentId}/${postId}`);
}

// Service to edit comment from server
export const fetchEditComment = async (commentId, postId, data) => {
    return await api.patch(`/comments/edit-comment/${commentId}/${postId}`, data);
}
