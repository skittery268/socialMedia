import { useForm } from "../hooks/useForm";
import { useGroup } from "../hooks/useGroup";

const CreateGroupForm = ({ isOpen, setIsOpen }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        name: ""
    });

    const { createGroup } = useGroup();

    return (
        <>
            {
                isOpen && (
                    <form onSubmit={(e) => { handleSubmit(e, createGroup); resetForm() }}>
                        <input type="text" name="name" placeholder="Group name..." value={formData.name} onChange={handleChange} />
                        <br />
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                    </form>
                )
            }
        </>
    )
}

export default CreateGroupForm;