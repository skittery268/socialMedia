// React tools
import { memo, useState } from "react";

// Hooks
import { useForm } from "../hooks/useForm";
import { useGroup } from "../hooks/useGroup";

// Icons
import { X, ImagePlus } from "lucide-react";

// Component to create new group (form)
const CreateGroupForm = memo(({ setIsOpen }) => {
    const [formData, handleChange, , resetForm] = useForm({
        name: ""
    });
    const [file, setFile] = useState("");

    const { createGroup } = useGroup();

    const submitFormInformation = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("name", formData.name);
        data.append("image", file[0]);

        await createGroup(data);

        resetForm();
        setIsOpen(false);
    }

    return (
        <section
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
        >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
            <form
                onSubmit={submitFormInformation}
                onClick={(e) => e.stopPropagation()}
                className="card relative z-10 w-full max-w-md animate-scale-in"
            >
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="text-base font-semibold">Create group</h2>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-5 py-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Group name</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Frontend Guild"
                            value={formData.name}
                            onChange={handleChange}
                            className="field h-11 px-3.5 text-sm"
                        />
                    </label>

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm text-muted transition-colors hover:border-primary hover:text-primary">
                        <ImagePlus size={18} />
                        <span>{file && file[0] ? file[0].name : "Group image"}</span>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setFile(e.target.files)}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="btn-ghost h-10 px-4 text-sm"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary h-10 px-5 text-sm">
                        Create group
                    </button>
                </div>
            </form>
        </section>
    )
});

export default CreateGroupForm;