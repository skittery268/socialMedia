// React Tools
import { useState } from "react";

// Context
import { FriendContext } from "../context/FriendContext"

// Services
import { fetchAcceptFriendRequest, fetchCancelFriendRequest, fetchFriendRequests, fetchFriends, fetchRejectFriendRequest, fetchRemoveFriend, fetchSendFriendRequest } from "../services/FriendService";

// Toastify
import { toast } from "react-toastify";

// Provider
export const FriendProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    // Function to get friends from server and set it to state
    const getFriends = async () => {
        try {
            const res = await fetchFriends();

            setFriends(res.data.data.friendships);
        } catch (err) {
            console.log(err);
        }
    }

    // Function to get friend requests from server and set it to state
    const getFriendRequests = async () => {
        try {
            const res = await fetchFriendRequests();

            setFriendRequests(res.data.data.friendRequests);
        } catch (err) {
            console.log(err);
        }
    }

    // Function to send friend request from server
    const sendFriendRequest = async (to) => {
        try {
            const res = await fetchSendFriendRequest(to);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to cancel friend request from server
    const cancelFriendRequest = async (friendRequestId) => {
        try {
            const res = await fetchCancelFriendRequest(friendRequestId);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to reject friend request from server
    const rejectFriendRequest = async (friendRequestId) => {
        try {
            const res = await fetchRejectFriendRequest(friendRequestId);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to accept friend request from server
    const acceptFriendRequest = async (friendRequestId) => {
        try {
            const res = await fetchAcceptFriendRequest(friendRequestId);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to remove friend from server
    const removeFriend = async (friendshipId) => {
        try {
            const res = await fetchRemoveFriend(friendshipId);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <FriendContext.Provider value={{ friends, friendRequests, getFriends, getFriendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest, removeFriend }}>
            {children}
        </FriendContext.Provider>
    )
}