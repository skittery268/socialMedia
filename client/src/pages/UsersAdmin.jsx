import { useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import DeleteUser from "../components/DeleteUser";

const UsersAdmin = () => {
    const { users } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <section className="flex justify-center items-start p-8 pt-0 min-h-screen m-auto">
            { isOpen && <DeleteUser setIsOpen={setIsOpen} userId={selectedUserId} /> }
            <div className="w-full max-w-6xl flex flex-col gap-5 m-auto">
                <h1 className="text-3xl font-semibold text-gray-800">Users</h1>

                <div className="bg-white rounded-2xl shadow-sm max-h-143 overflow-y-scroll scroll-auto overflow-hidden border border-gray-100">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">User</th>
                                <th className="px-6 py-5 text-center text-sm font-medium text-gray-500">Role</th>
                                <th className="px-6 py-5 text-center text-sm font-medium text-gray-500">Status</th>
                                <th className="px-8 py-5 text-center text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((u, index) => {
                                const isBanned = u.isBanned;
                                const isWarned = u.warnings > 0 && !isBanned;

                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium bg-blue-100 text-blue-600">
                                                    {u?.name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{u.name}</div>
                                                    <div className="text-sm text-gray-500">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm text-gray-700 font-medium">
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-sm font-medium
                                                ${isBanned 
                                                    ? 'bg-red-100 text-red-700' 
                                                    : isWarned 
                                                        ? 'bg-amber-100 text-amber-700' 
                                                        : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {isBanned ? "Banned" : isWarned ? "Warned" : "Active"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {isBanned ? (
                                                    <button className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition">
                                                        Unban
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button className="px-5 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 border border-amber-200 hover:border-amber-300 rounded-xl transition">
                                                            Warn
                                                        </button>
                                                        <button className="px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-xl transition">
                                                            Ban
                                                        </button>
                                                        <button 
                                                            className="px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-xl transition"
                                                            onClick={() => { setSelectedUserId(u._id); setIsOpen(true) }}
                                                            >
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
            </div>
        </section>
    );
};

export default UsersAdmin;