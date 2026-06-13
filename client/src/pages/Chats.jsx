// React Router
import { useNavigate } from "react-router";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useGroup } from "../hooks/useGroup";

// React Tools
import { useEffect } from "react";

// Components
import Avatar from "../components/Avatar";

// Icons
import { ChevronRight, MessageSquare } from "lucide-react";

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

    const isEmpty = chats.length === 0 && groups.length === 0;

    const Row = ({ src, name, badge, onClick }) => (
        <button
            onClick={onClick}
            className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted"
        >
            <Avatar src={src} name={name} size={44} shape={badge ? "square" : "circle"} />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{name}</p>
                {badge && <p className="text-xs text-faint">Group conversation</p>}
            </div>
            <ChevronRight
                size={18}
                className="text-faint transition-transform group-hover:translate-x-0.5"
            />
        </button>
    );

    return (
        <section className="mx-auto w-full max-w-2xl px-4 py-6">
            <h1 className="mb-4 text-xl font-semibold tracking-tight">Messages</h1>

            {isEmpty ? (
                <div className="card flex flex-col items-center gap-2 px-6 py-16 text-center">
                    <MessageSquare size={26} className="text-faint" />
                    <p className="text-sm font-medium text-body">No conversations yet</p>
                    <p className="text-xs text-faint">
                        Start a chat from someone&apos;s profile to see it here.
                    </p>
                </div>
            ) : (
                <div className="card divide-y divide-line overflow-hidden">
                    {chats.map((c, index) => {
                        const thisUser = c.user1._id === user._id ? c.user2 : c.user1;
                        return (
                            <Row
                                key={`c-${index}`}
                                src={thisUser.image?.url}
                                name={thisUser.name}
                                onClick={() => {
                                    openChat(thisUser._id);
                                    navigate(`/user/chat/${thisUser._id}`);
                                }}
                            />
                        );
                    })}

                    {groups.map((g, index) => (
                        <Row
                            key={`g-${index}`}
                            src={g.image?.url}
                            name={g.name}
                            badge
                            onClick={() => {
                                openGroup(g._id);
                                navigate(`/user/group/${g._id}`);
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Chats;
