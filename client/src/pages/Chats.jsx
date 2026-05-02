import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useGroup } from "../hooks/useGroup";
import { useEffect } from "react";

const Chats = () => {
    const { user } = useAuth();
    const { chats, getUserChats, openChat } = useChat();
    const { groups, getGroups, openGroup } = useGroup();

    useEffect(() => {
        getUserChats();
        getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            {
                chats.map((c, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/chat/${c._id}`} onClick={() => openChat(c.user1._id === user._id ? c.user2._id : c.user1._id)}>
                                { user._id === c.user1._id ? c.user2.name : c.user1.name }
                            </Link>
                        </div>
                    )
                })
            }

            {
                groups.map((g, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/group/${g._id}`} onClick={() => openGroup(g._id)}>
                                {g.name}
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Chats;