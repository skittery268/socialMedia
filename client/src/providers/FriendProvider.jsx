// React Tools
import { useCallback, useEffect, useState } from "react";

// Context
import { FriendContext } from "../context/FriendContext"

// Services
import { fetchAcceptFriendRequest, fetchCancelFriendRequest, fetchFriendRequests, fetchFriends, fetchRejectFriendRequest, fetchRemoveFriend, fetchSendFriendRequest } from "../services/FriendService";

// Toastify
import { toast } from "react-toastify";

// Hooks
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";

// Configs
import { socket } from "../configs/socket";

// Provider
export const FriendProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const { users, getUsers } = useChat();
    const { user } = useAuth();

    useEffect(() => {
        getUsers();
    }, [friendRequests, friends, getUsers]);

    useEffect(() => {
        const handleNewFriendRequest = (friendRequest) => {
            setFriendRequests(prev => [...prev, friendRequest]);
            toast.info(`You have new friend request from ${friendRequest.from.name}!`);
        };

        const handlecancelFriendRequest = (friendReqeuestId) => {
            setFriendRequests(prev => prev.filter(fr => fr._id.toString() !== friendReqeuestId.toString()));
        };

        const handleRejectFriendRequest = (data) => {
            setFriendRequests(prev => prev.filter(fr => fr._id !== data.friendRequestId));
            const to = users.find(user => user._id.toString() === data.userId.toString());

            toast.info(`${to?.name} rejected your friend request!`);
        };

        const handleAcceptFriendRequest = (data) => {
            setFriendRequests(prev => prev.filter(fr => fr._id.toString() !== data.friendRequestId.toString()));
            setFriends(prev => [...prev, data.friendship]);

            const to = data.friendship.user1 === user._id ? data.friendship.user1 : data.friendship.user2;

            toast.info(`${to.name} accepted your friend request!`);
        };

        const handleRemoveFriend = (friendshipId) => {
            setFriends(prev => prev.filter(f => f._id.toString() !== friendshipId.toString()));
        }

        socket.on("accept-friend-request", handleAcceptFriendRequest);
        socket.on("reject-friend-request", handleRejectFriendRequest);
        socket.on("cancel-friend-request", handlecancelFriendRequest);
        socket.on("new-friend-request", handleNewFriendRequest);
        socket.on("remove-friend", handleRemoveFriend);

        return () => {
            socket.off("accept-friend-request", handleAcceptFriendRequest);
            socket.off("reject-friend-request", handleRejectFriendRequest);
            socket.off("cancel-friend-request", handlecancelFriendRequest);
            socket.off("new-friend-request", handleNewFriendRequest);
            socket.off("remove-friend", handleRemoveFriend);
        }
    }, [friendRequests.length, user?._id, users]);

    // Function to get friends from server and set it to state
    const getFriends = useCallback(async () => {
        try {
            const res = await fetchFriends();

            setFriends(res.data.data.friendships);
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Function to get friend requests from server and set it to state
    const getFriendRequests = useCallback(async () => {
        try {
            const res = await fetchFriendRequests();

            setFriendRequests(res.data.data.friendRequests);
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Function to send friend request from server
    const sendFriendRequest = useCallback(async (to) => {
        try {
            const res = await fetchSendFriendRequest(to);

            setFriendRequests(prev => [...prev, res.data.data.friendRequest]);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to cancel friend request from server
    const cancelFriendRequest = useCallback(async (friendRequestId) => {
        try {
            const res = await fetchCancelFriendRequest(friendRequestId);

            setFriendRequests(prev => prev.filter(fr => fr._id.toString() !== friendRequestId.toString()));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to reject friend request from server
    const rejectFriendRequest = useCallback(async (friendRequestId) => {
        try {
            const res = await fetchRejectFriendRequest(friendRequestId);

            setFriendRequests(prev => prev.filter(fr => fr._id.toString() !== friendRequestId.toString()));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to accept friend request from server
    const acceptFriendRequest = useCallback(async (friendRequestId) => {
        try {
            const res = await fetchAcceptFriendRequest(friendRequestId);

            setFriendRequests(prev => prev.filter(fr => fr._id.toString() !== friendRequestId.toString()));
            setFriends(prev => [...prev, res.data.data.friendship]);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to remove friend from server
    const removeFriend = useCallback(async (friendshipId) => {
        try {
            const res = await fetchRemoveFriend(friendshipId);

            setFriends(prev => prev.filter(f => f._id.toString() !== friendshipId.toString()));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    return (
        <FriendContext.Provider value={{ friends, friendRequests, getFriends, getFriendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest, removeFriend }}>
            {children}
        </FriendContext.Provider>
    )
}