import { useState } from "react"
import { GroupContext } from "../context/GroupContext"
import { fetchAddMember, fetchCreateGroup, fetchDeleteGroup, fetchDeleteMember, fetchEditGroup, fetchGroups, fetchLeaveGroup } from "../services/GroupService";
import { toast } from "react-toastify";
import { socket } from "../configs/socket";

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);

    const getGroups = async () => {
        try {
            const res = await fetchGroups();

            setGroups(res.data.data.groups);
        } catch (err) {
            console.log(err);
        }
    }

    const createGroup = async (data) => {
        try {
            const res = await fetchCreateGroup(data);

            setGroups(prev => [...prev, res.data.data.group]);

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const leaveGroup = async (memberId, groupId) => {
        try {
            const res = await fetchLeaveGroup(memberId, groupId);

            setGroups(prev => prev.filter(group => group._id != groupId));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const deleteGroup = async (groupId) => {
        try {
            const res = await fetchDeleteGroup(groupId);

            setGroups(prev => prev.filter(group => group._id != groupId));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const editGroup = async (groupId, data) => {
        try {
            const res = await fetchEditGroup(groupId, data);

            setGroups(prev => prev.map(group => group._id == groupId ? res.data.data.group : group));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const addMember = async (memberId, groupId) => {
        try {
            await fetchAddMember(memberId, groupId);

            toast.success("Member added successfully!");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const deleteMember = async (memberId, groupId) => {
        try {
            await fetchDeleteMember(memberId, groupId);

            toast.success("Member deleted successfully!");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const openGroup = (groupId) => {
        socket.emit("join-group-chat", groupId);
    }

    const closeGroup = (groupId) => {
        socket.emit("leave-group-chat", groupId);
    }

    return (
        <GroupContext.Provider value={{ groups, getGroups, createGroup, leaveGroup, deleteGroup, editGroup, addMember, deleteMember, openGroup, closeGroup }}>
            {children}
        </GroupContext.Provider>
    )
}