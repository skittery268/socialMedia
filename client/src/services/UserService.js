// Axios
import { api } from "../api/axios"

// Service to fetch user by id from server
export const fetchUserById = async (id) => {
    return await api.get(`/users/get-user/${id}`);
}

export const fetchEditUserInfo = async (data) => {
    return await api.patch(`users/edit-info`, data);
}