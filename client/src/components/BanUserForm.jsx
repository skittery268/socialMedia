import { useAdmin } from "../hooks/useAdmin";
import { useForm } from "../hooks/useForm";

const BanUserForm = ({ setIsOpenBan, userId }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        reason: "",
        duration: ""
    });

    const { banUser } = useAdmin();

    return (
        <section 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setIsOpenBan(false)}
            >
            <div className="absolute inset-0 bg-black/50" />
            <form 
                onSubmit={(e) => { handleSubmit(e, (data) => banUser(userId, data)); resetForm(); setIsOpenBan(false) }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-90 max-w-[90vw] bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-4"
                >
                <button 
                    type="button"
                    onClick={() => setIsOpenBan(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none z-20 cursor-pointer"
                >
                    ×
                </button>
                <h1 className="text-center text-[30px] relative -top-3">Ban User</h1>
                <input 
                    type="text" 
                    name="reason" 
                    placeholder="Reason..." 
                    value={formData.reason} 
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-300 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    required
                />
                <input 
                    type="number" 
                    name="duration" 
                    placeholder="Duration..." 
                    value={formData.duration} 
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-300 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                <br />
                <div className="flex flex-col sm:flex-row sm:justify-between w-65 ml-5">
                    <button
                        type="submit"
                        className="px-10 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-xl transition cursor-pointer"
                        >
                        Ban
                    </button>
                    <button 
                        onClick={() => setIsOpenBan(false)}
                        className="px-10 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition cursor-pointer"
                        >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    )
}

export default BanUserForm;