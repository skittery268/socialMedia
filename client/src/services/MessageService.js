import { api } from "../api/axios"

export const fetchMessages = async (mode, id) => {
    return await api.get(`/messages/get-messages/${mode}/${id}`);
}

export const fetchSendMessage = async (mode, id, data) => {
    return await api.post(`/messages/send-message/${mode}/${id}`, data);
}

export const fetchDeleteMessage = async (mode, messageId) => {
    return await api.delete(`/messages/delete-message/${mode}/${messageId}`);
}

export const fetchEditMessage = async (mode, id, data) => {
    return await api.patch(`/messages/edit-message/${mode}/${id}`, data);
}

