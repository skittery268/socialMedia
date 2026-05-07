import { useComment } from "../hooks/useComment";
import { useForm } from "../hooks/useForm";

const EditComment = ({ setEditedCommentId, c, p }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        content: ""
    });

    const { editComment } = useComment();

    return (
        <form onSubmit={(e) => { handleSubmit(e, (data) => editComment(c._id, p._id, data)); resetForm(); setEditedCommentId(null) }} className="flex gap-2">
            <input 
                type="text" 
                name="content" 
                placeholder="Edit comment" 
                value={formData.content} 
                onChange={handleChange}
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer text-sm font-medium">Edit</button>
            <button type="button" onClick={() => setEditedCommentId(null)} className="px-4 py-2 bg-gray-400 text-white cursor-pointer rounded-lg hover:bg-gray-500 text-sm font-medium">Cancel</button>
        </form>
    )
}

export default EditComment;