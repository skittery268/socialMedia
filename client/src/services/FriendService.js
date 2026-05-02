// Axios
import { api } from "../api/axios"

// Service to fetch friend requests from server
export const fetchFriendRequests = async () => {
    return await api.get("/friendRequests/get-friend-requests");
}

// Service to fetch friends from server
export const fetchFriends = async () => {
    return await api.get("/friendships/get-friends");
}

// Service to send friend request to server
export const fetchSendFriendRequest = async (to) => {
    return await api.post(`/friendRequests/send-friend-request/${to}`);
}

// Service to cancel friend request from server
export const fetchCancelFriendRequest = async (friendRequestId) => {
    return await api.delete(`/friendRequests/cancel-friend-request/${friendRequestId}`);
}

// Service to reject friend request from server
export const fetchRejectFriendRequest = async (friendRequestId) => {
    return await api.delete(`/friendRequests/reject-friend-request/${friendRequestId}`);
}

// Service to accept friend request from server
export const fetchAcceptFriendRequest = async (friendRequestId) => {
    return await api.put(`/friendRequests/accept-friend-request/${friendRequestId}`);
}

// Service to remove friend from server
export const fetchRemoveFriend = async (friendshipId) => {
    return await api.delete(`/friendships/remove-friend/${friendshipId}`);
}

