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
        <form className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <input
                type="text"
                name="content"
                placeholder="Type message..."
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            />
            <div className="flex flex-wrap justify-end gap-2">
                <button
                    type="button"
                    onClick={(e) => {
                        handleSubmit(e, (data) => editMessage(mode, editedMessageId, data));
                        resetForm();
                        setEditedMessageId(null);
                    }}
                    className="rounded-2xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => setEditedMessageId(null)}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
});

export default MessageEditForm;