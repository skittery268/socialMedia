import { api } from "../api/axios"

export const fetchChats = async () => {
    return await api.get(`/chats/get-chats`);
}

export const fetchCreateChat = async (user2) => {
    return await api.post(`/chats/create-chat/${user2}`);
}

export const fetchDeleteChat = async (chatId) => {
    return await api.delete(`/chats/delete-chat/${chatId}`);
}
