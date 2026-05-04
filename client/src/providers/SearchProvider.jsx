// React toastify
import { toast } from "react-toastify"

// Context
import { SearchContext } from "../context/SearchContext"

// Services
import { fetchSearchPosts, fetchSearchUsers } from "../services/SearchService"

// React tools
import { useCallback, useEffect, useState } from "react"
import { usePost } from "../hooks/usePost"

// Provider
export const SearchProvider = ({ children }) => {
    const { posts } = usePost();
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchedPosts(posts);
    }, [posts]);

    // Function to search posts by content
    const searchPosts = useCallback(async (content) => {
        try {
            const res = await fetchSearchPosts(content);

            console.log(res.data.data.posts);

            setSearchedPosts(res.data.data.posts);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    // Function to search users by name
    const searchUsers = useCallback(async (name) => {
        try {
            const res = await fetchSearchUsers(name);

            setSearchedUsers(res.data.data.users);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }, []);

    return (
        <SearchContext.Provider value={{ searchedPosts, searchedUsers, searchPosts, searchUsers }}>
            {children}
        </SearchContext.Provider>
    )
}