// React Tools
import { useState } from "react";

// Components
import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";

// Hooks
import { useAuth } from "../hooks/useAuth"
import { useForm } from "../hooks/useForm";
import { useGroup } from "../hooks/useGroup";

// Profile page
const Profile = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        name: ""
    });

    const { createGroup } = useGroup();

    return (
        <>
            <p>{user?.name}</p>
            <p>{user?.email}</p>

            { !isOpen && <button onClick={() => setIsOpen(true)}>Create Group</button> }

            {
                isOpen && (
                    <form onSubmit={(e) => { handleSubmit(e, createGroup); resetForm() }}>
                        <input type="text" name="name" placeholder="Group name..." value={formData.name} onChange={handleChange} />
                        <br />
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                    </form>
                )
            }

            <UploadPost />
            <ViewPosts mode={"profile"} />
        </>
    )
}

export default Profile;