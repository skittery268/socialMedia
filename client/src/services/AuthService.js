import { api } from "../api/axios"

// Request to login user
export const fetchLogin = async (data) => {
    return await api.post("/auth/login", data);
}

// Request to register new user
export const fetchRegister = async (data) => {
    return await api.post("/auth/register", data);
}

// Request to logout user (clear cookies section)
export const fetchLogout = async () => {
    return await api.delete("/auth/logout");
}

// Request to auto login
export const fetchMe = async () => {
    return await api.get("/auth/me");
}