import { useAdmin } from "../hooks/useAdmin";

const DeleteUser = ({ setIsOpen, userId }) => {
    const { deleteUser } = useAdmin();

    return (
        <section 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
            >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-90 max-w-[90vw] bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-4">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none z-20 cursor-pointer"
                >
                    ×
                </button>
                <h1 className="text-center text-[30px] relative -top-3">Create Group</h1>
                <p className="text-[19px]">Are you sure you want to do this? The action cannot be reversed.</p>
                <div className="flex justify-center items-center gap-5">
                    <button 
                        onClick={() => deleteUser(userId)} 
                        className="px-10 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-xl transition cursor-pointer"
                        >
                        Delete
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="px-10 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition cursor-pointer"
                        >
                        Cancel
                        </button>
                </div>
            </div>
        </section>
    )
}

export default DeleteUser;