// React tools
import { useCallback, useState } from "react"

// Context
import { toast } from "react-toastify"

// Context
import { AdminContext } from "../context/AdminContext"

// Services
import { fetchAnalytic, fetchBanUser, fetchChangeRole, fetchDeleteUser, fetchUnBun, fetchWarnUser } from "../services/AdminService"
import { fetchUsers } from "../services/ChatService"

// Provider
export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [statystic, setStatystic] = useState({});

    // Function to get all users
    const getUsersAdmin = useCallback(async () => {
        try {
            const res = await fetchUsers();

            setUsers(res.data.data.users);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to get analytic for admin
    const getAnalytic = useCallback(async () => {
        try {
            const res = await fetchAnalytic();

            setStatystic(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Function to delete any user
    const deleteUser = useCallback(async (userId) => {
        try {
            const res = await fetchDeleteUser(userId);

            setUsers(prev => prev.filter(u => u._id !== userId));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to ban user
    const banUser = useCallback(async (userId, data) => {
        try {
            const res = await fetchBanUser(userId, data);

            setUsers(prev => prev.map(u => u._id === userId ? res.data.data.user : u));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to unbun user
    const unBunUser = useCallback(async (userId) => {
        try {
            const res = await fetchUnBun(userId);

            toast.success(res.data.message);
            setUsers(prev => prev.map(u => u._id === userId ? res.data.data.user : u));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to warn user
    const warnUser = useCallback(async (userId, data) => {
        try {
            const res = await fetchWarnUser(userId, data);
            console.log(res);

            setUsers(prev => prev.map(u => u._id === userId ? res.data.data.user : u));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to change user role
    const changeRole = useCallback(async (userId) => {
        try {
            const res = await fetchChangeRole(userId);

            setUsers(prev => prev.map(u => u._id === userId ? res.data.data.user : u));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    return (
        <AdminContext.Provider value={{ users, statystic, getUsersAdmin, getAnalytic, deleteUser, banUser, unBunUser, warnUser, changeRole }}>
            {children}
        </AdminContext.Provider>
    )
}