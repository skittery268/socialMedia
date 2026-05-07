// React tools
import { useState } from "react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

// Component to edit user info (form)
const EditUserInfo = ({ setIsEdited }) => {
    const [formData, handleChange, , resetForm] = useForm({
        name: "",
        email: "",
        password: ""
    });
    const { editUserInfo, deleteUserAvatar } = useAuth();
    const [file, setFile] = useState("");

    const submitEditedUserInfo = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);

        data.append("image", file[0]);

        await editUserInfo(data);

        resetForm()
        setIsEdited(false);
    }

    return (
        <section 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setIsEdited(false)}
        >
            <div className="absolute inset-0 bg-black/50" />
            <form 
                onSubmit={submitEditedUserInfo}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-90 max-w-[90vw] bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-4"
            >
                <button 
                    onClick={() => setIsEdited(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none z-20 cursor-pointer"
                >
                    ×
                </button>
                <h1 className="text-center text-2xl font-semibold">Edit user information</h1>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name"
                    className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-300 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-300 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password"
                    className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-300 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                <input 
                    type="file" 
                    name="image" 
                    onChange={(e) => setFile(e.target.files)}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button type="button" onClick={deleteUserAvatar} className="h-10 cursor-pointer w-full sm:w-[48%] text-white bg-red-500 rounded-2xl hover:bg-red-600 transition duration-200">Delete Avatar</button>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4 mt-2">
                    <button type="submit" className="h-10 cursor-pointer w-full sm:w-[48%] text-white bg-green-500 rounded-2xl hover:bg-green-600 transition duration-200">Save</button>
                    <button type="button" onClick={() => setIsEdited(false)} className="h-10 cursor-pointer w-full sm:w-[48%] text-white bg-red-500 rounded-2xl hover:bg-red-600 transition duration-200">Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default EditUserInfo;