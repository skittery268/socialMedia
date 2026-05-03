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
        <form>
            <input type="text" name="content" placeholder="Type message..." value={formData.content} onChange={handleChange} />
            <br />
            <button type="button" onClick={(e) => { handleSubmit(e, (data) => editMessage(mode, editedMessageId, data)); resetForm(); setEditedMessageId(null) }}>Save</button>
            <button type="button" onClick={() => setEditedMessageId(null)}>Cancel</button>
        </form>
    )
});

export default MessageEditForm;