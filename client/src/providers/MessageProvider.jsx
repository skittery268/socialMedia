// React Tools
import { useEffect, useState } from "react"

// Context
import { MessageContext } from "../context/MessageContext"

// Services
import { fetchDeleteMessage, fetchEditMessage, fetchMessages, fetchSendMessage } from "../services/MessageService";

// Toastify
import { toast } from "react-toastify";

// Configs
import { socket } from "../configs/socket";

// Provider
export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    // Use effect to communicate with server (user) in real time using socket.io
    useEffect(() => {
        // Function to handle new message
        const handleSendMessage = (msg) => {
            setMessages(prev => prev.some(m => m._id === msg._id) ? prev : [...prev, msg]);
        }

        // Function to handle delete message
        const handleDeleteMessage = (msgId) => {
            setMessages(prev => prev.filter(m => m._id !== msgId));
        }

        // Function to handle edit message
        const handleEditMessage = (msg) => {
            setMessages(prev => prev.map(m => m._id === msg._id ? msg : m));
        }

        // Event listeners for new message, delete message and edit message
        socket.on("new-message", handleSendMessage);
        socket.on("delete-message", handleDeleteMessage);
        socket.on("edit-message", handleEditMessage);

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            socket.off("new-message", handleSendMessage);
            socket.off("delete-message", handleDeleteMessage);
            socket.off("edit-message", handleEditMessage);
        }
    }, [])

    // Function to get messages from server and set it to state
    const getMessages = async (mode, id) => {
        try {
            const res = await fetchMessages(mode, id);

            setMessages(res.data.data.messages);
        } catch (err) {
            console.log(err);
        }
    }

    // Function to send message to server
    const sendMessage = async (mode, id, data) => {
        try {
            const res = await fetchSendMessage(mode, id, data);
            
            setMessages(prev => prev.some(m => m._id === res.data.data.message._id) ? prev : [...prev, res.data.data.message]);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to delete message from server
    const deleteMessage = async (mode, messageId) => {
        try {
            await fetchDeleteMessage(mode, messageId);

            setMessages(prev => prev.filter(m => m._id !== messageId));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to edit message from server
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