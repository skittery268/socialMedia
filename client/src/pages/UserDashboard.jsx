// React router component
import { Outlet } from "react-router";

// Components
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

// Hooks
import { useChat } from "../hooks/useChat";
import { useComment } from "../hooks/useComment";
import { useFriend } from "../hooks/useFriend";
import { useGroup } from "../hooks/useGroup";
import { useLike } from "../hooks/useLike";
import { useMessage } from "../hooks/useMessage";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";

// User dashboard
const UserDashboard = () => {
    const [loading, setLoading] = useState(true);
    const { getUserChats, getUsers } = useChat();
    const { getComments } = useComment();
    const { getFriends,getFriendRequests } = useFriend();
    const { getGroups } = useGroup();
    const { getLikes } = useLike();
    const { getMessages } = useMessage();
    const { getPosts } = usePost();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(true);
            getUserChats();
            getUsers();
            getComments();
            getFriendRequests();
            getFriends();
            getGroups();
            getLikes();
            getMessages();
            getPosts();
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearInterval(timer);
    }, [getUserChats, getUsers, getComments, getFriendRequests, getFriends, getGroups, getLikes, getMessages, getPosts, user]);

    if (loading) {
        return <Loading />
    }
    
    return (
        <section>
            <div className="flex justify-center items-center flex-col bg-[#F3F2EF]">
                <Nav />

                <Outlet />
            </div>
        </section>
    )
}

export default UserDashboard;