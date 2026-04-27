import { api } from "../api/axios"

export const fetchUserById = async (id) => {
    return await api.get(`/users/get-user/${id}`);
}