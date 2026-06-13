import { memo } from "react";
import { useComment } from "../hooks/useComment";
import { useForm } from "../hooks/useForm";

const EditComment = memo(({ setEditedCommentId, c, p }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });

    const { editComment } = useComment();

    return (
        <form onSubmit={(e) => { handleSubmit(e, (data) => editComment(c._id, p._id, data)); resetForm(); setEditedCommentId(null) }} className="flex flex-col gap-2">
            <input
                type="text"
                name="content"
                placeholder="Edit comment…"
                value={formData.content}
                onChange={handleChange}
                className="field h-9 bg-surface px-3 text-sm"
            />
            <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditedCommentId(null)} className="btn-ghost h-8 px-3 text-xs">Cancel</button>
                <button type="submit" className="btn-primary h-8 px-3 text-xs">Save</button>
            </div>
        </form>
    )
})

export default EditComment;