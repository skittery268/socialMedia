// React Tools
import { useState } from "react"

// Context
import { GroupContext } from "../context/GroupContext"

// Services
import { fetchAddMember, fetchCreateGroup, fetchDeleteGroup, fetchDeleteMember, fetchEditGroup, fetchGroups, fetchLeaveGroup } from "../services/GroupService";

// Toastify
import { toast } from "react-toastify";

// Configs
import { socket } from "../configs/socket";
import { useNavigate } from "react-router";

// Provider
export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    // Function to get groups from server and set it to state
    const getGroups = async () => {
        try {
            const res = await fetchGroups();

            setGroups(res.data.data.groups);
        } catch (err) {
            console.log(err);
        }
    }

    // Function to create group from server and add it to state
    const createGroup = async (data) => {
        try {
            const res = await fetchCreateGroup(data);

            setGroups(prev => [...prev, res.data.data.group]);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to leave group from server and remove it from state
    const leaveGroup = async (memberId, groupId) => {
        try {
            const res = await fetchLeaveGroup(memberId, groupId);

            setGroups(prev => prev.filter(group => group._id != groupId));
            toast.success(res.data.message);
            navigate("/chats");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to delete group from server and remove it from state
    const deleteGroup = async (groupId) => {
        try {
            const res = await fetchDeleteGroup(groupId);

            setGroups(prev => prev.filter(group => group._id != groupId));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to edit group from server and update it in state
    const editGroup = async (groupId, data) => {
        try {
            const res = await fetchEditGroup(groupId, data);

            setGroups(prev => prev.map(group => group._id == groupId ? res.data.data.group : group));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to add member in group from server
    const addMember = async (memberId, groupId) => {
        try {
            const res = await fetchAddMember(memberId, groupId);

            setGroups(prev => prev.map(gr => gr._id === res.data.data.group._id ? res.data.data.group : gr));
            await getGroups();
            toast.success("Member added successfully!");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to delete member from group from server
    const deleteMember = async (memberId, groupId) => {
        try {
            const res = await fetchDeleteMember(memberId, groupId);

            setGroups(prev => prev.map(gr => gr._id === res.data.data.group._id ? res.data.data.group : gr));
            await getGroups();
            toast.success("Member deleted successfully!");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to open group chat by joining group room in socket
    const openGroup = (groupId) => {
        socket.emit("join-group-chat", groupId);
    }

    // Function to close group chat by leaving group room in socket
    const closeGroup = (groupId) => {
        socket.emit("leave-group-chat", groupId);
    }

    return (
        <GroupContext.Provider value={{ groups, getGroups, createGroup, leaveGroup, deleteGroup, editGroup, addMember, deleteMember, openGroup, closeGroup }}>
            {children}
        </GroupContext.Provider>
    )
}