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
import Avatar from "./Avatar";

// Icons
import {
    LogOut,
    UserPlus,
    SendHorizontal,
    Pencil,
    Trash2,
    X,
} from "lucide-react";

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
        <section className="mx-auto w-full max-w-6xl px-4 py-6">
            <div className="card flex h-[calc(100vh-7rem)] flex-col overflow-hidden">
                {/* Group header */}
                <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
                    <div className="flex items-center gap-3">
                        <Avatar src={group?.image?.url} name={group?.name || "?"} size={40} shape="square" />
                        <div>
                            <h1 className="text-base font-semibold text-ink">{group?.name}</h1>
                            <p className="text-xs text-faint">{group?.members?.length ?? 0} members</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => leaveGroup(user._id, group._id)}
                        className="btn-ghost h-9 gap-1.5 px-3 text-sm text-muted hover:text-danger"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Leave</span>
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[280px_1fr]">
                    {/* Members */}
                    <aside className="flex max-h-56 flex-col overflow-hidden border-b border-line bg-surface-sunken p-4 lg:max-h-none lg:border-b-0 lg:border-r">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-ink">Members</h2>
                            <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted">
                                {group?.members?.length ?? 0}
                            </span>
                        </div>

                        <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                            {group?.members?.map((m, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-2 rounded-xl bg-surface px-3 py-2"
                                >
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <Avatar src={m.image?.url} name={m.name} size={30} />
                                        <p className="truncate text-sm text-body">{m.name}</p>
                                    </div>

                                    {m._id !== group.owner._id &&
                                        (user._id === group.owner._id || admins.includes(user._id)) && (
                                            <button
                                                type="button"
                                                onClick={() => deleteMember(m._id, group._id)}
                                                className="shrink-0 rounded-md p-1 text-faint transition-colors hover:bg-danger-soft hover:text-danger"
                                                aria-label="Remove member"
                                            >
                                                <X size={15} />
                                            </button>
                                        )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => setShowAddMember(prev => !prev)}
                                className="btn-ghost h-9 w-full gap-1.5 text-sm"
                            >
                                <UserPlus size={16} />
                                {showAddMember ? "Hide" : "Add member"}
                            </button>

                            {showAddMember && (
                                <div className="mt-2 max-h-44 space-y-1 overflow-y-auto pr-1">
                                    {friends.map((fr, index) => {
                                        const u = fr.user1._id === user._id ? fr.user2 : fr.user1;

                                        if (!groupMembers.includes(u._id)) {
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => addMember(u._id, group._id)}
                                                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-body transition-colors hover:bg-surface-muted"
                                                >
                                                    <Avatar src={u.image?.url} name={u.name} size={28} />
                                                    <span className="truncate">{u.name}</span>
                                                </button>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Messages */}
                    <main className="flex min-h-0 flex-col">
                        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                            {messages.map((m) => {
                                const isOwnMessage = user?._id && m.senderId?._id === user._id;

                                return (
                                    <div
                                        key={m._id}
                                        className={`group flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className="max-w-[80%]">
                                            {editedMessageId === m._id ? (
                                                <MessageEditForm
                                                    mode="group"
                                                    editedMessageId={editedMessageId}
                                                    setEditedMessageId={setEditedMessageId}
                                                    initialContent={m.content}
                                                />
                                            ) : (
                                                <div
                                                    className={`rounded-2xl px-4 py-2.5 ${
                                                        isOwnMessage
                                                            ? "rounded-br-md bg-primary text-white"
                                                            : "rounded-bl-md bg-surface-muted text-body"
                                                    }`}
                                                >
                                                    {!isOwnMessage && (
                                                        <p className="mb-0.5 text-xs font-semibold text-muted">
                                                            {m.senderId?.name || "Unknown"}
                                                        </p>
                                                    )}
                                                    <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
                                                        {m.content}
                                                    </p>
                                                    <div
                                                        className={`mt-1 flex items-center gap-2 text-[11px] ${
                                                            isOwnMessage ? "text-white/70" : "text-faint"
                                                        }`}
                                                    >
                                                        {m.createdAt && (
                                                            <span>
                                                                {new Date(m.createdAt).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </span>
                                                        )}
                                                        {isOwnMessage && (
                                                            <span className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setEditedMessageId(m._id)}
                                                                    className="rounded p-0.5 hover:text-white"
                                                                    aria-label="Edit"
                                                                >
                                                                    <Pencil size={13} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => deleteMessage("group", m._id)}
                                                                    className="rounded p-0.5 hover:text-white"
                                                                    aria-label="Delete"
                                                                >
                                                                    <Trash2 size={13} />
                                                                </button>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <form
                            onSubmit={(e) => { handleSubmit(e, (data) => sendMessage("group", id, data)); resetForm() }}
                            className="flex items-center gap-2 border-t border-line px-5 py-3"
                        >
                            <input
                                type="text"
                                name="content"
                                placeholder="Message the group…"
                                value={formData.content}
                                onChange={handleChange}
                                className="field h-11 px-4 text-sm"
                            />
                            <button
                                type="submit"
                                className="btn-primary h-11 w-11 shrink-0 px-0"
                                aria-label="Send"
                            >
                                <SendHorizontal size={18} />
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default Group;
