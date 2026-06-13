// React Tools
import { useEffect, useState } from "react";

// Hooks
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";

// React Router
import { useParams, useNavigate } from "react-router";

// Components
import MessageEditForm from "./MessageEditForm";
import Avatar from "./Avatar";

// Icons
import { ArrowLeft, SendHorizontal, Pencil, Trash2 } from "lucide-react";

// Chat component
const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });
    const { user } = useAuth();
    const { getUserChats } = useChat();
    const { sendMessage, messages, deleteMessage, getMessages } = useMessage();
    const [editedMessageId, setEditedMessageId] = useState(null);

    useEffect(() => {
        getUserChats();
        getMessages("chat", id);
    }, [getMessages, getUserChats, id]);

    // Derive the conversation partner's name/avatar from the messages
    const peer = messages.find((m) => m.senderId?._id && m.senderId._id !== user._id)?.senderId;

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-6">
            <div className="card flex h-[calc(100vh-7rem)] flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                    <button
                        onClick={() => navigate("/user/chats")}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink sm:hidden"
                        aria-label="Back"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <Avatar src={peer?.image?.url} name={peer?.name || "?"} size={38} />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                            {peer?.name || "Conversation"}
                        </p>
                        <p className="text-xs text-faint">Direct message</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
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
                                            mode="chat"
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
                                                            onClick={() => deleteMessage("chat", m._id)}
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

                {/* Composer */}
                <form
                    onSubmit={(e) => { handleSubmit(e, (data) => sendMessage("chat", id, data)); resetForm(); }}
                    className="flex items-center gap-2 border-t border-line px-4 py-3"
                >
                    <input
                        type="text"
                        name="content"
                        placeholder="Type a message…"
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
            </div>
        </section>
    );
};

export default Chat;
