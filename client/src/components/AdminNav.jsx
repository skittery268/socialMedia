import { NavLink, useNavigate } from "react-router";
import { BarChart3, Users, FileText, ArrowLeft } from "lucide-react";

const AdminNav = () => {
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
                ? "bg-danger-soft text-danger"
                : "text-muted hover:bg-surface-muted hover:text-ink"
        }`;

    return (
        <nav className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r border-line bg-surface px-3 py-5 lg:flex">
            <div className="mb-6 flex items-center gap-2 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                <span className="text-sm font-semibold tracking-tight text-ink">
                    DevLink Admin
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
                <NavLink to={"/admin/analytic"} className={linkClass}>
                    <BarChart3 size={17} />
                    Analytics
                </NavLink>
                <NavLink to={"/admin/users"} className={linkClass}>
                    <Users size={17} />
                    Users
                </NavLink>
                <NavLink to={"/admin/posts"} className={linkClass}>
                    <FileText size={17} />
                    Posts
                </NavLink>
            </div>

            <button
                onClick={() => navigate("/user/profile")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
                <ArrowLeft size={17} />
                Exit admin mode
            </button>
        </nav>
    );
};

export default AdminNav;
