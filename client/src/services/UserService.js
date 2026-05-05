// Axios
import { api } from "../api/axios"

// Service to fetch user by id from server
export const fetchUserById = async (id) => {
    return await api.get(`/users/get-user/${id}`);
}

// Service to fetch edit user information
export const fetchEditUserInfo = async (data) => {
    return await api.patch(`/users/edit-info`, data);
}

// Service to fetch delete user avatar
export const fetchDeleteAvatar = async () => {
    return await api.delete("/users/delete-avatar");
}
