import { useForm } from "../hooks/useForm";
import { useSearch } from "../hooks/useSearch";

const SearchBar = ({ mode }) => {
    const formDataProperty = mode === "posts" ? { content: "" } : { name: "" }

    const [formData, handleChange, handleSubmit, resetForm] = useForm(formDataProperty);
    
    const { searchPosts, searchUsers } = useSearch();

    return (
        <form onSubmit={(e) => { handleSubmit(e, (data) => { mode === "posts" ? searchPosts(data.content) : searchUsers(data.name) }); resetForm() }}>
            <input type="text" name={mode === "posts" ? "content" : "name"} placeholder="Search..." value={mode === "posts" ? formData.content : formData.name} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;