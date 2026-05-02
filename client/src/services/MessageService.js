// Axios
import { api } from "../api/axios"

// Service to fetch messages from server
export const fetchMessages = async (mode, id) => {
    return await api.get(`/messages/get-messages/${mode}/${id}`);
}

// Service to send message to server
export const fetchSendMessage = async (mode, id, data) => {
    return await api.post(`/messages/send-message/${mode}/${id}`, data);
}

// Service to delete message from server
export const fetchDeleteMessage = async (mode, messageId) => {
    return await api.delete(`/messages/delete-message/${mode}/${messageId}`);
}

// Service to edit message from server
export const fetchEditMessage = async (mode, id, data) => {
    return await api.patch(`/messages/edit-message/${mode}/${id}`, data);
}

