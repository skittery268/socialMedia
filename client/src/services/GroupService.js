// Axios
import { api } from "../api/axios"

// Service to fetch groups from server
export const fetchGroups = async () => {
    return await api.get("/groups/get-groups");
}

// Service to create new group from server
export const fetchCreateGroup = async (data) => {
    return await api.post("/groups/create-group", data);
}

// Service to leave group from server
export const fetchLeaveGroup = async (memberId, groupId) => {
    return await api.delete(`/groups/leave-group/${memberId}/${groupId}`);
}

// Service to delete group from server
export const fetchDeleteGroup = async (groupId) => {
    return await api.delete(`/groups/delete-group/${groupId}`);
}

// Service to edit group from server
export const fetchEditGroup = async (groupId, data) => {
    return await api.patch(`/groups/edit-group/${groupId}`, data);
}

// Service to add member to group from server
export const fetchAddMember = async (memberId, groupId) => {
    return await api.post(`/groups/add-member/${memberId}/${groupId}`);
}

// Service to delete member from group from server
export const fetchDeleteMember = async (memberId, groupId) => {
    return await api.delete(`/groups/delete-member/${memberId}/${groupId}`);
}
