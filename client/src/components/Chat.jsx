// React Tools
import { useEffect, useState } from "react";

// Hooks
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";

// React Router
import { useParams } from "react-router";

// Components
import MessageEditForm from "./MessageEditForm";

// Chat component
const Chat = () => {
    const { id } = useParams();
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    })
    const { user } = useAuth();
    const { getUserChats } = useChat();
    const { sendMessage, messages, deleteMessage, getMessages } = useMessage();
    const [editedMessageId, setEditedMessageId] = useState(null);

    useEffect(() => {
        getUserChats();
        getMessages("chat", id);
    }, [getMessages, getUserChats, id]);

    return (
        <section className="w-full flex justify-center items-center px-4">
            <div className="bg-white w-full max-w-4xl mt-10 rounded-3xl shadow border border-gray-200 min-h-140 relative overflow-hidden">
                <div className="h-[calc(100%-104px)] overflow-y-auto px-4 pt-4 pb-6">
                    {messages.map((m) => {
                        const isOwnMessage = user?._id && m.senderId?._id === user._id;

                        return (
                            <div key={m._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-3`}> 
                                <div className={`max-w-[85%] rounded-3xl p-4 shadow-sm ${isOwnMessage ? "bg-blue-50 text-slate-900 rounded-br-sm" : "bg-slate-100 text-slate-900 rounded-bl-sm"}`}>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <p className="font-semibold text-sm text-slate-700">{isOwnMessage ? "You" : m.senderId?.name || "Unknown"}</p>
                                        {m.createdAt && (
                                            <span className="text-[11px] text-slate-500">{new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                        )}
                                    </div>

                                    {editedMessageId === m._id ? (
                                        <MessageEditForm
                                            mode="chat"
                                            editedMessageId={editedMessageId}
                                            setEditedMessageId={setEditedMessageId}
                                            initialContent={m.content}
                                        />
                                    ) : (
                                        <>
                                            <p className="whitespace-pre-wrap text-sm leading-6">{m.content}</p>
                                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                                                <button
                                                    type="button"
                                                    onClick={() => deleteMessage("chat", m._id)}
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
                    onSubmit={(e) => { handleSubmit(e, (data) => sendMessage("chat", id, data)); resetForm(); }}
                    className="w-full absolute bottom-0 left-0 border-t border-slate-200 bg-white px-4 py-4 flex items-center gap-3"
                >
                    <input
                        type="text"
                        name="content"
                        placeholder="Type message..."
                        value={formData.content}
                        onChange={handleChange}
                        className="flex-1 min-w-0 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                    />
                    <button
                        type="submit"
                        className="whitespace-nowrap rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Chat;