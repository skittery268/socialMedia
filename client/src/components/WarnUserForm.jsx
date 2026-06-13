import { useAdmin } from "../hooks/useAdmin";
import { useForm } from "../hooks/useForm";
import { X, AlertTriangle } from "lucide-react";

const WarnUserForm = ({ setIsOpenWarn, userId }) => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        reason: "",
        duration: ""
    });

    const { warnUser } = useAdmin();

    return (
        <section
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4"
            onClick={() => setIsOpenWarn(false)}
        >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
            <form
                onSubmit={(e) => { handleSubmit(e, (data) => warnUser(userId, data)); resetForm(); setIsOpenWarn(false) }}
                onClick={(e) => e.stopPropagation()}
                className="card relative z-10 w-full max-w-md animate-scale-in"
            >
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-warning">
                        <AlertTriangle size={17} />
                        Warn user
                    </h2>
                    <button
                        type="button"
                        onClick={() => setIsOpenWarn(false)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-5 py-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Reason</span>
                        <input
                            type="text"
                            name="reason"
                            placeholder="Reason for the warning"
                            value={formData.reason}
                            onChange={handleChange}
                            className="field h-11 px-3.5 text-sm"
                            required
                        />
                    </label>
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Duration (days)</span>
                        <input
                            type="number"
                            name="duration"
                            placeholder="e.g. 3"
                            value={formData.duration}
                            onChange={handleChange}
                            className="field h-11 px-3.5 text-sm"
                        />
                    </label>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
                    <button
                        type="button"
                        onClick={() => setIsOpenWarn(false)}
                        className="btn-ghost h-10 px-4 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-warning px-5 text-sm font-medium text-white transition-colors hover:brightness-95"
                    >
                        Warn user
                    </button>
                </div>
            </form>
        </section>
    );
};

export default WarnUserForm;
