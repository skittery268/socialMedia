// Axios
import { api } from "../api/axios"

// Service to fetch chats from server
export const fetchChats = async () => {
    return await api.get(`/chats/get-chats`);
}

// Service to create new chat from server
export const fetchCreateChat = async (user2) => {
    return await api.post(`/chats/create-chat/${user2}`);
}

// Service to delete chat from server
export const fetchDeleteChat = async (chatId) => {
    return await api.delete(`/chats/delete-chat/${chatId}`);
}

// Service to fetch all users from server
export const fetchUsers = async () => {
    return await api.get("/admin/get-all-users");
}
