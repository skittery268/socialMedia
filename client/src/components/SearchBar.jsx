// Hooks
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useSearch } from "../hooks/useSearch";

// React Router
import { useNavigate } from "react-router";

// React Tools
import { memo, useEffect, useRef, useState } from "react";

// Components
import Users from "./Users";

// Serach bar component
const SearchBar = memo(({ mode }) => {
    const formDataProperty = mode === "posts" ? { content: "" } : { name: "" }
    const { user } = useAuth();
    const navigate = useNavigate();
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

    return (
        <section>
            {
                mode === "posts" ? (
                    <div className="flex justify-center items-center gap-3 bg-white w-190 h-15 mt-5 mb-4 rounded-2xl shadow">
                        {
                            user.image ? (
                                <div className="rounded-full ml-1 hover:bg-black">
                                    <img 
                                        src={user.image.url} 
                                        alt="User avatar"
                                        className="h-10 rounded-full hover:opacity-90 cursor-pointer"
                                        onClick={() => navigate("/user/profile")}
                                    />
                                </div>
                            ) : (
                                <div className="ml-1 bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                                    <p className="text-[12px] font-bold text-white">{user.name[0]}</p>
                                </div>
                            )
                        }

                        <form 
                            onSubmit={(e) => { handleSubmit(e, (data) => { searchPosts(data.content) }); resetForm() }}
                            className="w-170"
                            >
                            <input 
                                type="text"
                                name="content"
                                autoComplete="off"
                                placeholder="Search post..."
                                value={formData.content}
                                onChange={handleChange}
                                className="w-147 h-10 pl-5 pr-9 bg-[#F8FAFC] border border-gray-300 rounded-[10px] outline-none focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                            <button 
                                type="submit"
                                className="bg-blue-500 h-10 w-20 rounded-full hover:bg-blue-600 text-white cursor-pointer ml-3"
                                >
                                Search
                            </button>
                        </form>
                    </div>
                ) : (
                    <div ref={searchRef} className="relative">
                        <form 
                            onSubmit={(e) => { handleSubmit(e, (data) => { searchUsers(data.name) }); resetForm() }}
                            >
                            <input 
                                type="text" 
                                name="name"
                                autoComplete="off"
                                onFocus={() => setIsSearching(true)}
                                placeholder="Search in DevLink..." 
                                value={formData.name}
                                onChange={handleChange}
                                className="w-50 h-10 pl-5 pr-9 bg-[#F8FAFC] border border-gray-300 rounded-[10px] outline-none focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </form>

                        {
                            isSearching && (
                                <Users setIsSearching={setIsSearching} />
                            )
                        }
                    </div>
                )
            }
        </section>
    )
})

export default SearchBar;