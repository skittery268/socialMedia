// React tools
import { memo, useState } from "react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

// Icons
import { X, ImagePlus, Trash2 } from "lucide-react";

// Component to edit user info (form)
const EditUserInfo = memo(({ setIsEdited }) => {
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

        resetForm();
        setIsEdited(false);
    };

    return (
        <section
            className="fixed inset-0 z-50 flex animate-fade-in items-start justify-center overflow-y-auto p-4 sm:items-center"
            onClick={() => setIsEdited(false)}
        >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
            <form
                onSubmit={submitEditedUserInfo}
                onClick={(e) => e.stopPropagation()}
                className="card relative z-10 mt-16 w-full max-w-md animate-scale-in sm:mt-0"
            >
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="text-base font-semibold">Edit profile</h2>
                    <button
                        type="button"
                        onClick={() => setIsEdited(false)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-5 py-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="field h-11 px-3.5 text-sm"
                        />
                    </label>
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="field h-11 px-3.5 text-sm"
                        />
                    </label>
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Password</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="New password"
                            className="field h-11 px-3.5 text-sm"
                        />
                    </label>

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm text-muted transition-colors hover:border-primary hover:text-primary">
                        <ImagePlus size={18} />
                        <span>{file && file[0] ? file[0].name : "Change avatar"}</span>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setFile(e.target.files)}
                            className="hidden"
                        />
                    </label>

                    <button
                        type="button"
                        onClick={deleteUserAvatar}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-danger-soft bg-danger-soft text-sm font-medium text-danger transition-colors hover:bg-danger hover:text-white"
                    >
                        <Trash2 size={15} />
                        Remove current avatar
                    </button>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
                    <button
                        type="button"
                        onClick={() => setIsEdited(false)}
                        className="btn-ghost h-10 px-4 text-sm"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary h-10 px-5 text-sm">
                        Save changes
                    </button>
                </div>
            </form>
        </section>
    );
});

export default EditUserInfo;
