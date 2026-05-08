// React Tools
import { memo, useEffect } from "react";

// Hooks
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { useSearch } from "../hooks/useSearch";

// React router
import { useNavigate } from "react-router";

// Users component to show all users and link to their profile
const Users = memo(({ setIsSearching }) => {
    const { getUsers } = useChat();
    const { searchedUsers } = useSearch();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, [getUsers])

    return (
        <section className="absolute bg-white rounded-2xl -left-10 top-15 w-70 min-h-60 max-h-150 overflow-y-auto overflow-x-hidden border border-gray-300 shadow-2xl flex flex-col">
            {
                searchedUsers.map((u, index) => {
                    if (u._id !== user._id) {
                        return (
                            <div 
                                key={index} 
                                className="border border-gray-100 bg-gray-100 p-3 hover:bg-gray-200 cursor-pointer"
                                onClick={() => { navigate(`/usersprofile/${u._id}`); setIsSearching(false) }}
                                >
                                <div className="text-sm text-gray-800 flex gap-3 w-90">
                                    {
                                        u.image ? (
                                            <img 
                                                src={u.image.url} 
                                                alt="User avatar"
                                                className="h-10 w-10 rounded-full"
                                            />
                                        ) : (
                                            <div className="ml-1 bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                                                <p className="text-[12px] font-bold text-white">{u.name[0]}</p>
                                            </div>
                                        )
                                    }
                                    <div>
                                        <p>{u.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </section>
    )
})

export default Users;