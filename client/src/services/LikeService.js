// Axios
import { api } from "../api/axios"

// Service to fetch likes from server
export const fetchLikes = async () => {
    return await api.get("/likes/get-likes");
}

// Service to like post from server
export const fetchLikePost = async (postId, authorId) => {
    return await api.post(`/likes/like-post/${postId}/${authorId}`);
}

// Service to like comment from server
export const fetchLikeComment = async (commentId, authorId) => {
    return await api.post(`/likes/like-comment/${commentId}/${authorId}`);
}

// Service to unlike from server
export const fetchUnLike = async (likeId) => {
    return await api.delete(`/likes/unlike/${likeId}`);
}
