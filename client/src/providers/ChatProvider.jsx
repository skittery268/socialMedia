// React Tools
import { useState } from "react"

// Context
import { ChatContext } from "../context/ChatContext"

// Services
import { fetchChats, fetchCreateChat, fetchDeleteChat, fetchUsers } from "../services/ChatService";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Toastify
import { toast } from "react-toastify";

// Configs
import { socket } from "../configs/socket";

// Provider
export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState({});
    const [users, setUsers] = useState([]);
    const { user } = useAuth();

    // Function to get user chats from server and set it to state
    const getUserChats = async () => {
        try {
            const res = await fetchChats();

            setChats(res.data.data.chats);
            return res.data.data.chats;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    // Function to get users from server and set it to state
    const getUsers = async () => {
        try {
            const res = await fetchUsers();

            setUsers(res.data.data.users);
        } catch (err) {
            console.log(err);
        }
    };

    // Function to create chat from server and add it to state
    const addChat = async (user2) => {
        try {
            const res = await fetchCreateChat(user2);

            setChats(prev => [...prev, res.data.data.chat]);

            return res.data.data.chat;
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    // Function to delete chat from server and remove it from state
    const deleteChat = async (chatId) => {
        try {
            await fetchDeleteChat(chatId);

            setChats(prev => prev.filter(c => c._id !== chatId));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    // Function to open chat and join it in socket
    const openChat = async (user2) => {
        const c = await getUserChats();

        let openedChat = c.find(c => (c._id === user2) || (c.user1._id === user._id && c.user2._id === user2) || (c.user2._id === user._id && c.user1._id === user2));

        if (!openedChat) {
            openedChat = await addChat(user2);
        }

        socket.emit("join-chat", openedChat._id);

        setChat(openedChat);
    };

    // Function to close chat and leave it in socket
    const closeChat = () => {
        socket.emit("leave-chat", chat._id);
        setChat({});
    };

    return (
        <ChatContext.Provider value={{ chats, users, chat, getUsers, getUserChats, addChat, deleteChat, openChat, closeChat }}>
            {children}
        </ChatContext.Provider>
    )
}