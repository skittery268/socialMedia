// Hooks
import { memo } from "react";
import { useForm } from "../hooks/useForm";
import { useMessage } from "../hooks/useMessage";

// Components to edit message
const MessageEditForm = memo(({ mode, editedMessageId, setEditedMessageId, initialContent = "" }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: initialContent
    })

    const { editMessage } = useMessage();

    return (
        <form className="card flex w-72 flex-col gap-2.5 p-3">
            <input
                type="text"
                name="content"
                placeholder="Edit message…"
                value={formData.content}
                onChange={handleChange}
                className="field h-10 px-3.5 text-sm"
            />
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => setEditedMessageId(null)}
                    className="btn-ghost h-8 px-3 text-xs"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        handleSubmit(e, (data) => editMessage(mode, editedMessageId, data));
                        resetForm();
                        setEditedMessageId(null);
                    }}
                    className="btn-primary h-8 px-3 text-xs"
                >
                    Save
                </button>
            </div>
        </form>
    )
});

export default MessageEditForm;