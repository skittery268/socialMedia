// React Tools
import { memo, useState } from "react";

// Hooks
import { useForm } from "../hooks/useForm";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";

// UploadPost component to upload a new post
const UploadPost = memo(({ setIsOpen2 }) => {
    const [formData, handleChange, , resetForm] = useForm({
        content: ""
    });
    const [files, setFiles] = useState([]);
    const { user } = useAuth();

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
        <section 
            className="fixed inset-0 z-50 flex justify-center" 
            onClick={() => setIsOpen2(false)}
            >
            <div className="absolute inset-0 bg-black/50" />
            
            <form 
                onSubmit={(e) => { submitPost(e); setIsOpen2(false) }}
                className="relative z-10 w-130 h-100 bg-white p-4 pl-8 pr-8 rounded-xl shadow-2xl flex flex-col gap-4 mt-35"
                onClick={(e) => e.stopPropagation()}
                >
                <button 
                    onClick={() => setIsOpen2(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none z-20 cursor-pointer"
                >
                    ×
                </button>
                <h1 className="text-center text-[30px] p-0 m-0">Upload Post</h1>
                <hr className="-translate-x-8 w-130 border-gray-300" />
                <div className="flex gap-3">
                    {
                        user.image ? (
                            <div className="w-10 h-10 rounded-full bg-center bg-cover flex justify-center items-center">
                                <img src={user.image.url} className="w-full h-full rounded-full bg-center bg-cover flex justify-center items-center" alt="user avatar" />
                            </div>
                        ) : (
                            <>
                                <div className="bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                                    <p className="text-[40px] text-white">{user.name[0]}</p>
                                </div>
                            </>
                        )
                    }
                    <h1>{user.name}</h1>
                </div>
                <textarea 
                    type="text" 
                    name="content" 
                    placeholder={`What's new with you ${user.name.split(" ")[0]}?`}
                    value={formData.content} 
                    onChange={handleChange}
                    className="w-full h-30 px-4 pt-2 bg-[#F8FAFC] border border-gray-300 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                ></textarea>
                <input 
                    type="file" 
                    multiple 
                    placeholder="Upload files" 
                    onChange={(e) => setFiles([...e.target.files])}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button className="w-full bg-blue-600 text-white h-10 rounded-[5px] cursor-pointer hover:bg-blue-500">Upload</button>
            </form>
        </section>
    )
})

export default UploadPost;