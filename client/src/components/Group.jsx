// React Tools
import { useEffect, useState } from "react";

// React Router
import { useParams } from "react-router";

// Hooks
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";
import { useGroup } from "../hooks/useGroup";

// Components
import MessageEditForm from "./MessageEditForm";

// Group component
const Group = () => {
    const { id } = useParams();
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    })
    const { sendMessage, messages, deleteMessage, getMessages } = useMessage();
    const { groups, deleteMember } = useGroup();
    const [editedMessageId, setEditedMessageId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const group = groups.find(g => g._id === id);

    useEffect(() => {
        getMessages("group", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>  
            { !isOpen && <button onClick={() => setIsOpen(true)}>Members</button> }

            {
                isOpen ? (
                    <>
                        {
                            group.members.map((m, index) => {
                                return (
                                    <div key={index}>
                                        <p>{m.name}</p>
                                        { m._id !== group.owner._id && <button onClick={() => deleteMember(id, m._id)}>Delete</button> }
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <>
                        {
                            messages.map((m, index) => {
                                return (
                                    <section key={index}>
                                        {
                                            editedMessageId === m._id ? (
                                                <MessageEditForm mode={"group"} editedMessageId={editedMessageId} setEditedMessageId={setEditedMessageId} />
                                            ) : (
                                                <div key={index}>
                                                    <p>{m.senderId.name}</p>
                                                    <p>{m.content}</p>
                                                    <button onClick={() => deleteMessage("group", m._id)}>Delete</button>
                                                    <button onClick={() => setEditedMessageId(m._id)}>Edit</button>
                                                </div>
                                            )
                                        }
                                    </section>
                                    
                                )
                            })
                        }

                        <form onSubmit={(e) => { handleSubmit(e, (data) => sendMessage("group", id, data)); resetForm() }}>
                            <input type="text" name="content" placeholder="Type message..." value={formData.content} onChange={handleChange} />
                            <br />
                            <button type="submit">Send</button>
                        </form>
                    </>
                )
            }
        </>
    )
}

export default Group;