// React tools
import { useState } from "react";

// Hooks
import { useAdmin } from "../hooks/useAdmin";

// Components
import DeleteUser from "../components/DeleteUser";
import BanUserForm from "../components/BanUserForm";
import WarnUserForm from "../components/WarnUserForm";
import Avatar from "../components/Avatar";

// Icons
import { AlertTriangle, Ban, Trash2, RotateCcw } from "lucide-react";

// Users list for admin actions
const UsersAdmin = () => {
    const { users, unBunUser, changeRole } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBan, setIsOpenBan] = useState(false);
    const [isOpenWarn, setIsOpenWarn] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-8">
            {isOpen && <DeleteUser setIsOpen={setIsOpen} userId={selectedUserId} />}
            {isOpenBan && <BanUserForm setIsOpenBan={setIsOpenBan} userId={selectedUserId} />}
            {isOpenWarn && <WarnUserForm setIsOpenWarn={setIsOpenWarn} userId={selectedUserId} />}

            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
                <p className="mt-1 text-sm text-muted">Manage roles and moderate members.</p>
            </div>

            <div className="card max-h-[70vh] overflow-auto">
                <table className="w-full min-w-160">
                    <thead className="sticky top-0 z-10 bg-surface">
                        <tr className="border-b border-line">
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-faint">User</th>
                            <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-faint">Role</th>
                            <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-faint">Status</th>
                            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-faint">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {users.map((u, index) => {
                            const isBanned = u.isBanned;
                            const isWarned = u.warnings.length > 0 && !isBanned;

                            return (
                                <tr key={index} className="transition-colors hover:bg-surface-sunken">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={u.image?.url} name={u.name} size={36} />
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold text-ink">{u.name}</div>
                                                <div className="truncate text-xs text-muted">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => changeRole(u._id)}
                                            title="Toggle role"
                                            className="cursor-pointer rounded-md border border-line-strong px-2.5 py-1 text-xs font-medium capitalize text-body transition-colors hover:border-primary hover:text-primary"
                                        >
                                            {u.role}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                isBanned
                                                    ? "bg-danger-soft text-danger"
                                                    : isWarned
                                                    ? "bg-warning-soft text-warning"
                                                    : "bg-success-soft text-success"
                                            }`}
                                        >
                                            {isBanned ? "Banned" : isWarned ? "Warned" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {isBanned ? (
                                                <button
                                                    onClick={() => unBunUser(u._id)}
                                                    className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-success-soft px-3 text-xs font-medium text-success transition-colors hover:bg-success hover:text-white"
                                                >
                                                    <RotateCcw size={14} />
                                                    Unban
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => { setSelectedUserId(u._id); setIsOpenWarn(true) }}
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-xs font-medium text-muted transition-colors hover:border-warning hover:bg-warning-soft hover:text-warning"
                                                    >
                                                        <AlertTriangle size={14} />
                                                        Warn
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedUserId(u._id); setIsOpenBan(true) }}
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-xs font-medium text-muted transition-colors hover:border-danger hover:bg-danger-soft hover:text-danger"
                                                    >
                                                        <Ban size={14} />
                                                        Ban
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedUserId(u._id); setIsOpen(true) }}
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-xs font-medium text-muted transition-colors hover:border-danger hover:bg-danger-soft hover:text-danger"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UsersAdmin;
