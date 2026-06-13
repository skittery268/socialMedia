// React Tools
import { memo, useEffect } from "react";

// Hooks
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { useSearch } from "../hooks/useSearch";

// React router
import { useNavigate } from "react-router";

// Components
import Avatar from "./Avatar";

// Icons
import { Search } from "lucide-react";

// Users component to show all users and link to their profile
const Users = memo(({ setIsSearching }) => {
    const { getUsers } = useChat();
    const { searchedUsers } = useSearch();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const results = searchedUsers.filter((u) => u._id !== user._id);

    return (
        <section className="absolute left-0 top-12 z-50 max-h-[60vh] w-72 origin-top-left animate-scale-in overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-lg">
            {results.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                    <Search size={22} className="text-faint" />
                    <p className="text-sm text-muted">No people found</p>
                </div>
            ) : (
                results.map((u, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            navigate(`/user/usersprofile/${u._id}`);
                            setIsSearching(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-muted"
                    >
                        <Avatar src={u.image?.url} name={u.name} size={36} />
                        <span className="truncate text-sm font-medium text-body">{u.name}</span>
                    </button>
                ))
            )}
        </section>
    );
});

export default Users;
