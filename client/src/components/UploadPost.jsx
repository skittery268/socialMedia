// React Tools
import { memo, useState } from "react";

// Hooks
import { useForm } from "../hooks/useForm";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";

// Components
import Avatar from "./Avatar";

// Icons
import { X, ImagePlus } from "lucide-react";

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
    };

    return (
        <section
            className="fixed inset-0 z-50 flex animate-fade-in items-start justify-center overflow-y-auto p-4 sm:items-center"
            onClick={() => setIsOpen2(false)}
        >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

            <form
                onSubmit={(e) => { submitPost(e); setIsOpen2(false) }}
                className="card relative z-10 mt-16 flex w-full max-w-lg animate-scale-in flex-col sm:mt-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="text-base font-semibold">Create post</h2>
                    <button
                        type="button"
                        onClick={() => setIsOpen2(false)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-4 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <Avatar src={user.image?.url} name={user.name} size={40} />
                        <div>
                            <p className="text-sm font-semibold text-ink">{user.name}</p>
                            <p className="text-xs text-faint">Posting publicly</p>
                        </div>
                    </div>

                    <textarea
                        name="content"
                        placeholder={`What's new with you, ${user.name.split(" ")[0]}?`}
                        value={formData.content}
                        onChange={handleChange}
                        className="field min-h-32 resize-none px-4 py-3 text-sm leading-relaxed"
                    />

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm text-muted transition-colors hover:border-primary hover:text-primary">
                        <ImagePlus size={18} />
                        <span>
                            {files.length > 0
                                ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                                : "Add photos"}
                        </span>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles([...e.target.files])}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
                    <button
                        type="button"
                        onClick={() => setIsOpen2(false)}
                        className="btn-ghost h-10 px-4 text-sm"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary h-10 px-5 text-sm">
                        Publish
                    </button>
                </div>
            </form>
        </section>
    );
});

export default UploadPost;
