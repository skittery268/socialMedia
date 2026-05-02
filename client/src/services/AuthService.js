import { api } from "../api/axios"

// Service to login user
export const fetchLogin = async (data) => {
    return await api.post("/auth/login", data);
}

// Service to register new user
export const fetchRegister = async (data) => {
    return await api.post("/auth/register", data);
}

// Service to logout user (clear cookies section)
export const fetchLogout = async () => {
    return await api.delete("/auth/logout");
}

// Service to auto login
export const fetchMe = async () => {
    return await api.get("/auth/me");
}