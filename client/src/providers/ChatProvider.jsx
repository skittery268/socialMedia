import { useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { toast } from "react-toastify";
import { fetchChats, fetchCreateChat, fetchDeleteChat, fetchUsers } from "../services/ChatService";
import { useAuth } from "../hooks/useAuth";
import { socket } from "../configs/socket";

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState({});
    const [users, setUsers] = useState([]);
    const { user } = useAuth();

    const getUserChats = async () => {
        try {
            const res = await fetchChats();

            setChats(res.data.data.chats);
        } catch (err) {
            console.log(err);
        }
    };

    const getUsers = async () => {
        try {
            const res = await fetchUsers();

            setUsers(res.data.data.users);
        } catch (err) {
            console.log(err);
        }
    };

    const addChat = async (user2) => {
        try {
            const res = await fetchCreateChat(user2);

            setChats(prev => [...prev, res.data.data.chat]);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const deleteChat = async (chatId) => {
        try {
            await fetchDeleteChat(chatId);

            setChats(prev => prev.filter(c => c._id !== chatId));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const openChat = (user2) => {
        const openedChat = chats.find(c => (c.user1._id === user._id && c.user2._id === user2) || (c.user2._id === user._id && c.user1._id === user2));

        if (!openedChat) {
            toast.error("Chat not found!");
            return;
        }

        socket.emit("join-chat", openedChat._id);

        setChat(openedChat);
    };

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