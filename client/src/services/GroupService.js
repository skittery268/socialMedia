import { api } from "../api/axios"

export const fetchGroups = async () => {
    return await api.get("/groups/get-groups");
}

export const fetchCreateGroup = async (data) => {
    return await api.post("/groups/create-group", data);
}

export const fetchLeaveGroup = async (memberId, groupId) => {
    return await api.delete(`/groups/leave-group/${memberId}/${groupId}`);
}

export const fetchDeleteGroup = async (groupId) => {
    return await api.delete(`/groups/delete-group/${groupId}`);
}

export const fetchEditGroup = async (groupId, data) => {
    return await api.patch(`/groups/edit-group/${groupId}`, data);
}

export const fetchAddMember = async (memberId, groupId) => {
    return await api.post(`/groups/add-member/${memberId}/${groupId}`);
}

export const fetchDeleteMember = async (memberId, groupId) => {
    return await api.delete(`/groups/delete-member/${memberId}/${groupId}`);
}