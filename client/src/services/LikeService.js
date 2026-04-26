import { api } from "../api/axios"

export const fetchLikes = async () => {
    return await api.get("/likes/get-likes");
}

export const fetchLikePost = async (postId, authorId) => {
    return await api.post(`/likes/like-post/${postId}/${authorId}`);
}

export const fetchLikeComment = async (commentId, authorId) => {
    return await api.post(`/likes/like-comment/${commentId}/${authorId}`);
}

export const fetchUnLike = async (likeId) => {
    return await api.delete(`/likes/unlike/${likeId}`);
}
