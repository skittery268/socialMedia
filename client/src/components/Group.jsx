// React Tools
import { useEffect, useState } from "react";

// React Router
import { useParams } from "react-router";

// Hooks
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import { useGroup } from "../hooks/useGroup";
import { useFriend } from "../hooks/useFriend";
import { useAuth } from "../hooks/useAuth";

// Components
import MessageEditForm from "./MessageEditForm";

// Group component
const Group = () => {
    const { id } = useParams();

    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });

    const { sendMessage, messages, deleteMessage, getMessages } = useMessage();
    const { groups, deleteMember, getGroups, openGroup, addMember, leaveGroup } = useGroup();
    const { friends, getFriends } = useFriend();
    const { user } = useAuth();

    const [editedMessageId, setEditedMessageId] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);

    useEffect(() => {
        getGroups();
        getMessages("group", id);
        openGroup(id);
        getFriends();
    }, [getFriends, getGroups, getMessages, id, openGroup]);

    const group = groups.find(g => g._id === id);

    let groupMembers = [];
    let admins = [];

    for (let i = 0; i < group?.members.length; i++) {
        groupMembers.push(group?.members[i]._id);
    }

    for (let i = 0; i < group?.admins.length; i++) {
        admins.push(group?.admins[i]._id);
    }

    return (
        <section className="w-full flex justify-center px-4 bg-[#F3F2EF] pb-10">
            <div className="bg-white w-full max-w-6xl mt-10 rounded-3xl shadow border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {group?.name}
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => leaveGroup(user._id, group._id)}
                            className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Leave Group
                        </button>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-[300px_1fr] h-[80vh]">
                    <aside className="border-r border-slate-200 bg-slate-50 p-5 flex flex-col overflow-hidden">

                        <div className="mb-5 flex items-center justify-between gap-2">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Members
                            </h2>

                            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">
                                {group?.members?.length ?? 0}
                            </span>
                        </div>

                        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                            {group?.members?.map((m, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
                                >
                                    <p className="text-sm text-slate-800">
                                        {m.name}
                                    </p>

                                    {(m._id !== group.owner._id &&
                                        (user._id === group.owner._id ||
                                            admins.includes(user._id))) && (
                                            <button
                                                type="button"
                                                onClick={() => deleteMember(m._id, group._id)}
                                                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-50"
                                            >
                                                Delete
                                            </button>
                                        )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setShowAddMember(prev => !prev)}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                                {showAddMember ? "Hide add member" : "Add Member"}
                            </button>

                            {showAddMember && (
                                <div className="mt-4 space-y-2 max-h-52 overflow-y-auto pr-1">

                                    {friends.map((fr, index) => {
                                        const u = fr.user1._id === user._id ? fr.user2 : fr.user1;

                                        if (!groupMembers.includes(u._id)) {
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => addMember(u._id, group._id)}
                                                    className="w-full text-left rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-100"
                                                >
                                                    {u.name}
                                                </button>
                                            );
                                        }

                                        return null;
                                    })}

                                    <button
                                        type="button"
                                        onClick={() => setShowAddMember(false)}
                                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>

                    <main className="bg-white p-5 flex flex-col h-full overflow-hidden">
                        <div className="flex-1 overflow-y-auto pr-1 pb-4">

                            {messages.map((m) => {
                                const isOwnMessage = user?._id && m.senderId?._id === user._id;

                                return (
                                    <div
                                        key={m._id}
                                        className={`flex ${isOwnMessage ? "justify-end" : "justify-start" } mb-3`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-3xl p-4 shadow-sm ${isOwnMessage ? "bg-blue-50 text-slate-900 rounded-br-sm" : "bg-slate-100 text-slate-900 rounded-bl-sm" }`}
                                        >

                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <p className="font-semibold text-sm text-slate-700">
                                                    {isOwnMessage ? "You" : m.senderId?.name || "Unknown"}
                                                </p>

                                                {m.createdAt && (
                                                    <span className="text-[11px] text-slate-500">
                                                        {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                    </span>
                                                )}
                                            </div>

                                            {editedMessageId === m._id ? (
                                                <MessageEditForm
                                                    mode="group"
                                                    editedMessageId={editedMessageId}
                                                    setEditedMessageId={setEditedMessageId}
                                                    initialContent={m.content}
                                                />
                                            ) : (
                                                <>
                                                    <p className="whitespace-pre-wrap text-sm leading-6">
                                                        {m.content}
                                                    </p>

                                                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">

                                                        <button
                                                            type="button"
                                                            onClick={() => deleteMessage("group", m._id)}
                                                            className="rounded-full border border-slate-300 bg-white px-3 py-1 hover:bg-slate-50 transition"
                                                        >
                                                            Delete
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => setEditedMessageId(m._id)}
                                                            className="rounded-full border border-slate-300 bg-white px-3 py-1 hover:bg-slate-50 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <form
                            onSubmit={(e) => { handleSubmit(e, (data) => sendMessage("group", id, data)); resetForm() }}
                            className="sticky bottom-0 mt-4 flex items-center gap-3 border-t border-slate-200 pt-4 bg-white"
                        >

                            <input
                                type="text"
                                name="content"
                                placeholder="Type message..."
                                value={formData.content}
                                onChange={handleChange}
                                className="flex-1 min-w-0 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                type="submit"
                                className="whitespace-nowrap rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default Group;