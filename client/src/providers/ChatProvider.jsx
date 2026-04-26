import { useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { toast } from "react-toastify";
import { fetchChats, fetchCreateChat, fetchDeleteChat } from "../services/ChatService";

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);

    const getUserChats = async () => {
        try {
            const res = await fetchChats();

            setChats(res.data.data.chats);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const addChat = async (user2) => {
        try {
            const res = await fetchCreateChat(user2);

            setChats(prev => [...prev, res.data.data.chat]);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const deleteChat = async (chatId) => {
        try {
            await fetchDeleteChat(chatId);

            setChats(prev => prev.filter(c => c._id !== chatId));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <ChatContext.Provider value={{ chats, getUserChats, addChat, deleteChat }}>
            {children}
        </ChatContext.Provider>
    )
}