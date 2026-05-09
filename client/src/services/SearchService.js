// Axios
import { api } from "../api/Axios"

// Service to search posts by content
export const fetchSearchPosts = async (content) => {
    return await api.get(`/search/get-posts?content=${content}`);
}

// Service to search users by name
export const fetchSearchUsers = async (name) => {
    return await api.get(`/search/get-users?name=${name}`);
}

