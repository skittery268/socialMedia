import { useEffect, useState } from "react"
import { MessageContext } from "../context/MessageContext"
import { fetchDeleteMessage, fetchEditMessage, fetchMessages, fetchSendMessage } from "../services/MessageService";
import { toast } from "react-toastify";
import { socket } from "../configs/socket";

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleSendMessage = (msg) => {
            setMessages(prev => [...prev, msg]);
        }

        const handleDeleteMessage = (msgId) => {
            setMessages(prev => prev.filter(m => m._id !== msgId));
        }

        const handleEditMessage = (msg) => {
            setMessages(prev => prev.map(m => m._id === msg._id ? msg : m));
        }

        socket.on("new-message", handleSendMessage);
        socket.on("delete-message", handleDeleteMessage);
        socket.on("edit-message", handleEditMessage);

        return () => {
            socket.off("new-message", handleSendMessage);
            socket.off("delete-message", handleDeleteMessage);
            socket.off("edit-message", handleEditMessage);
        }
    }, [])

    const getMessages = async (mode, id) => {
        try {
            const res = await fetchMessages(mode, id);

            setMessages(res.data.data.messages);
        } catch (err) {
            console.log(err);
        }
    }

    const sendMessage = async (mode, id, data) => {
        try {
            await fetchSendMessage(mode, id, data);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const deleteMessage = async (mode, messageId) => {
        try {
            await fetchDeleteMessage(mode, messageId);

            setMessages(prev => prev.filter(m => m._id !== messageId));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const editMessage = async (mode, id, data) => {
        try {
            await fetchEditMessage(mode, id, data);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <MessageContext.Provider value={{ messages, getMessages, sendMessage, deleteMessage, editMessage }}>
            {children}
        </MessageContext.Provider>
    )
}