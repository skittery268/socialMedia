// Axios
import { api } from "../api/Axios"

// Service to delete user
export const fetchDeleteUser = async (userId) => {
    return await api.delete(`/admin/delete-user/${userId}`);
}

// Service to ban user
export const fetchBanUser = async (userId, data) => {
    return await api.patch(`/admin/ban-user/${userId}`, data);
}

// Service to warn user
export const fetchWarnUser = async (userId, data) => {
    return await api.patch(`/admin/warn-user/${userId}`, data);
}

// Service to change user role
export const fetchChangeRole = async (userId) => {
    return await api.patch(`/admin/change-role/${userId}`);
}
