// React Tools
import { useState } from "react";

// Components
import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";

// Hooks
import { useAuth } from "../hooks/useAuth"
import { useForm } from "../hooks/useForm";
import CreateGroupForm from "../components/CreateGroupForm";

// Profile page
const Profile = () => {
    const { user, editUserInfo } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        name: "",
        email: "",
        password: ""
    });
    const [isEdited, setIsEdited] = useState(false);

    return (
        <>
            {
                isEdited ? (
                    <form onSubmit={(e) => { handleSubmit(e, editUserInfo); resetForm(); setIsEdited(false) }}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter new name" />
                        <br />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter new name" />
                        <br />
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new name" />
                        <br />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEdited(false)}>Cancel</button>
                    </form>
                ) : (
                    <>
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                        <button onClick={() => setIsEdited(true)}>Edit</button>
                    </>
                )
            }

            { !isOpen && <button onClick={() => setIsOpen(true)}>Create Group</button> }

            <CreateGroupForm isOpen={isOpen} setIsOpen={setIsOpen} />

            <UploadPost />
            <ViewPosts mode={"profile"} />
        </>
    )
}

export default Profile;