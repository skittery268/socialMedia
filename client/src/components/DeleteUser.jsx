import { useAdmin } from "../hooks/useAdmin";
import { AlertTriangle } from "lucide-react";

const DeleteUser = ({ setIsOpen, userId }) => {
    const { deleteUser } = useAdmin();

    return (
        <section
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
        >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
            <div
                className="card relative z-10 w-full max-w-sm animate-scale-in p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-danger-soft text-danger">
                    <AlertTriangle size={20} />
                </div>
                <h2 className="text-center text-lg font-semibold">Delete user</h2>
                <p className="mt-2 text-center text-sm text-muted">
                    Are you sure? This action is permanent and cannot be undone.
                </p>
                <div className="mt-6 flex gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn-ghost h-10 flex-1 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { deleteUser(userId); setIsOpen(false) }}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-danger text-sm font-medium text-white transition-colors hover:bg-danger-hover"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DeleteUser;
