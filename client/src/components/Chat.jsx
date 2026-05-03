// React Tools
import { useEffect, useState } from "react";

// Hooks
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import { useChat } from "../hooks/useChat";

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
    const { getUserChats } = useChat();
    const { sendMessage, messages, deleteMessage, getMessages } = useMessage();
    const [editedMessageId, setEditedMessageId] = useState(null);

    useEffect(() => {
        getUserChats();
        getMessages("chat", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // console.log(messages);
    // console.log(chat);

    return (
        <>
            {
                messages.map((m, index) => {
                    return (
                        <section key={index}>
                            {
                                editedMessageId === m._id ? (
                                    <MessageEditForm mode={"chat"} editedMessageId={editedMessageId} setEditedMessageId={setEditedMessageId} />
                                ) : (
                                    <div key={index}>
                                        <p>{m.senderId.name}</p>
                                        <p>{m.content}</p>
                                        <button onClick={() => deleteMessage("chat", m._id)}>Delete</button>
                                        <button onClick={() => setEditedMessageId(m._id)}>Edit</button>
                                    </div>
                                )
                            }
                        </section>
                        
                    )
                })
            }

            <form onSubmit={(e) => { handleSubmit(e, (data) => sendMessage("chat", id, data)); resetForm() }}>
                <input type="text" name="content" placeholder="Type message..." value={formData.content} onChange={handleChange} />
                <br />
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Chat;