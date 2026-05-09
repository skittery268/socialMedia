// React Router
import { Link, useNavigate } from "react-router";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useGroup } from "../hooks/useGroup";

// React Tools
import { useEffect } from "react";

// Chats page
const Chats = () => {
    const { user } = useAuth();
    const { chats, getUserChats, openChat } = useChat();
    const { groups, getGroups, openGroup } = useGroup();
    const navigate = useNavigate();

    useEffect(() => {
        getUserChats();
        getGroups();
    }, [getGroups, getUserChats, user]);

    return (
        <section className="w-340 min-h-60 mt-10 bg-white shadow border border-gray-400 rounded-xl p-3 gap-5 flex flex-wrap">
            {
                chats.map((c, index) => {
                    const thisUser = c.user1._id === user._id ? c.user2 : c.user1
                    return (
                        <div key={index} className="flex justify-center items-center flex-col">
                            {
                                thisUser.image ? (
                                    <div 
                                        className="w-40 h-40 relative rounded-full bg-center bg-cover flex justify-center items-center"
                                        onClick={() => navigate(`/chat/${thisUser._id}`)}
                                        >
                                        <div className="absolute inset-0 bg-black rounded-full"></div>
                                        <img src={thisUser.image.url} className="w-full h-full z-40 hover:opacity-85 cursor-pointer transition duration-200 rounded-full bg-center bg-cover flex justify-center items-center" alt="user avatar" />
                                    </div>
                                ) : (
                                    <>
                                        <div 
                                            className="bg-linear-to-r from-blue-400 to-red-400 w-40 h-40 relative rounded-full flex justify-center items-center"
                                            onClick={() => navigate(`/chat/${thisUser._id}`)}
                                            >
                                            <div className="absolute inset-0 bg-black rounded-full"></div>
                                            <div className="bg-linear-to-r from-blue-400 to-red-400 z-40 w-40 h-40 rounded-full absolute inset-0 hover:opacity-85 cursor-pointer"></div>
                                            <p className="text-[50px] z-50 text-white">{thisUser.name[0]}</p>
                                        </div>
                                    </>
                                )
                            }
                            <Link 
                                to={`/chat/${thisUser._id}`} 
                                onClick={() => openChat(thisUser._id)}
                                className="hover:underline"
                                >
                                { thisUser.name }
                            </Link>
                        </div>
                    )
                })
            }

            {
                groups.map((g, index) => {
                    return (
                        <div key={index} className="flex justify-center items-center flex-col">
                            {
                                g.image ? (
                                    <div 
                                        className="w-40 h-40 relative rounded-full bg-center bg-cover flex justify-center items-center"
                                        onClick={() => navigate(`/group/${g._id}`)}
                                        >
                                        <div className="absolute inset-0 bg-black rounded-full"></div>
                                        <img src={g.image.url} className="w-full h-full z-50 hover:opacity-85 cursor-pointer transition duration-200 rounded-full bg-center bg-cover flex justify-center items-center" alt="user avatar" />
                                    </div>
                                ) : (
                                    <>
                                        <div 
                                            className="bg-linear-to-r from-blue-400 to-red-400 w-40 h-40 relative rounded-full flex justify-center items-center"
                                            onClick={() => navigate(`/group/${g._id}`)}
                                            >
                                            <div className="absolute inset-0 bg-black rounded-full"></div>
                                            <div className="bg-linear-to-r from-blue-400 to-red-400 z-40 w-40 h-40 rounded-full absolute inset-0 hover:opacity-85 cursor-pointer"></div>
                                            <p className="text-[50px] z-50 text-white">{g.name[0]}</p>
                                        </div>
                                    </>
                                )
                            }
                            <Link 
                                to={`/group/${g._id}`} 
                                onClick={() => openGroup(g._id)}
                                className="hover:underline"
                                >
                                { g.name }
                            </Link>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Chats;