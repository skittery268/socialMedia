import { api } from "../api/axios"

export const fetchComments = async () => {
    return await api.get(`/comments/get-comments`);
}

export const fetchAddComment = async (postId, data) => {
    return await api.post(`/comments/add-comment/${postId}`, data);
}

export const fetchDeleteComment = async (commentId, postId) => {
    return await api.delete(`/comments/delete-comment/${commentId}/${postId}`);
}

export const fetchEditComment = async (commentId, postId, data) => {
    return await api.patch(`/edit-comment/${commentId}/${postId}`, data);
}