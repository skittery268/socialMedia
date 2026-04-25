import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { usePost } from "../hooks/usePost";

const UploadPost = () => {
    const [formData, handleChange, , resetForm] = useForm({
        content: ""
    });
    const [files, setFiles] = useState([]);

    const { addPost } = usePost();

    const submitPost = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("content", formData.content);

        files.forEach(file => {
            data.append("images", file);
        });

        await addPost(data);

        resetForm();
        setFiles([]);
    }

    return (
        <form onSubmit={submitPost}>
            <input type="text" name="content" placeholder="Enter post content" value={formData.content} onChange={handleChange} />
            <input type="file" multiple placeholder="Upload files" onChange={(e) => setFiles([...e.target.files])} />
            <button>Post</button>
        </form>
    )
}

export default UploadPost;