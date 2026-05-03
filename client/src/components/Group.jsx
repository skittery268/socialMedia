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
    })
    const { sendMessage, messages, deleteMessage, getMessages } = useMessage();
    const { groups, deleteMember, getGroups, openGroup, addMember, leaveGroup } = useGroup();
    const { friends, getFriends } = useFriend();
    const { user } = useAuth(); 
    const [editedMessageId, setEditedMessageId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    useEffect(() => {
        getGroups();
        getMessages("group", id);
        openGroup(id);
        getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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
        <>  
            { !isOpen && <button onClick={() => setIsOpen(true)}>Members</button> }
            { <button onClick={() => leaveGroup(user._id, group._id)}>Leave Group</button> }

            {
                isOpen ? (
                    <>
                        {
                            group.members.map((m, index) => {
                                return (
                                    <div key={index}>
                                        <p>{m.name}</p>
                                        { (m._id !== group.owner._id && user._id === group.owner._id || admins.includes(user._id)) && <button onClick={() => deleteMember(m._id, group._id)}>Delete</button> }
                                    </div>
                                )
                            })
                        }

                        <button onClick={() => setIsOpen2(true)}>Add Member</button>

                        {
                            isOpen2 && (
                                <div>
                                    {
                                        friends.map((fr, index) => {
                                            const u = fr.user1._id === user._id ? fr.user2 : fr.user1
                                            
                                            if (!groupMembers.includes(u._id)) {
                                                return (
                                                    <div key={index}>
                                                        <p onClick={() => addMember(u._id, group._id)}>{u.name}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <button onClick={() => setIsOpen2(false)}>Cancel</button>
                                </div>
                            )
                        }

                        <button onClick={() => setIsOpen(false)}>Close</button>
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