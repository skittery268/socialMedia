// Hooks
import { useForm } from "../hooks/useForm";
import { useSearch } from "../hooks/useSearch";

// React Tools
import { memo, useEffect, useRef, useState } from "react";

// Icons
import { Search } from "lucide-react";

// Components
import Users from "./Users";

// Search bar component
const SearchBar = memo(({ mode }) => {
    const formDataProperty = mode === "posts" ? { content: "" } : { name: "" };
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef();

    const [formData, handleChange, handleSubmit, resetForm] = useForm(formDataProperty);

    const { searchPosts, searchUsers } = useSearch();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearching(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (mode === "posts") {
        return (
            <form
                onSubmit={(e) => { handleSubmit(e, (data) => { searchPosts(data.content) }); resetForm() }}
                className="card flex items-center gap-2 p-2"
            >
                <div className="relative flex-1">
                    <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
                    <input
                        type="text"
                        name="content"
                        autoComplete="off"
                        placeholder="Search posts…"
                        value={formData.content}
                        onChange={handleChange}
                        className="field h-10 pl-10 pr-3 text-sm"
                    />
                </div>
                <button type="submit" className="btn-primary h-10 px-5 text-sm">
                    Search
                </button>
            </form>
        );
    }

    return (
        <div ref={searchRef} className="relative">
            <form onSubmit={(e) => { handleSubmit(e, (data) => { searchUsers(data.name) }); resetForm() }}>
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
                <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    onFocus={() => setIsSearching(true)}
                    placeholder="Search DevLink…"
                    value={formData.name}
                    onChange={handleChange}
                    className="field h-9 w-44 pl-9 pr-3 text-sm sm:w-64"
                />
            </form>

            {isSearching && <Users setIsSearching={setIsSearching} />}
        </div>
    );
});

export default SearchBar;
