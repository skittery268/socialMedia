// React Router
import { NavLink } from "react-router";

// Hooks
import { useAuth } from "../hooks/useAuth";

// React tools
import { useEffect, useRef, useState } from "react";

// Icons
import { Home, User, MessageSquare, Shield, Bell, LogOut } from "lucide-react";

// Components
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";

// Navigation component
const Nav = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const notificationRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Shared classes for top-level nav links (icon + label pill)
    const linkClass = ({ isActive }) =>
        `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive
                ? "bg-surface-muted text-ink"
                : "text-muted hover:bg-surface-muted hover:text-ink"
        }`;

    return (
        <>
            <div className="h-16 w-full" />
            <header className="fixed top-0 z-50 w-full border-b border-line bg-surface/80 backdrop-blur-md">
                <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5">
                    {/* Brand + search */}
                    <div className="flex items-center gap-3">
                        <NavLink
                            to={!user ? "/user/login" : "/user/home"}
                            className="flex items-center gap-2 pr-1"
                        >
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                            <span className="text-lg font-semibold tracking-tight text-ink">
                                DevLink
                            </span>
                        </NavLink>
                        {user && <SearchBar mode={"users"} />}
                    </div>

                    {user ? (
                        <div className="flex items-center gap-1">
                            <NavLink to={"/user/home"} className={linkClass}>
                                <Home size={17} strokeWidth={2} />
                                <span className="hidden sm:inline">Home</span>
                            </NavLink>
                            <NavLink to={"/user/profile"} className={linkClass}>
                                <User size={17} strokeWidth={2} />
                                <span className="hidden sm:inline">Profile</span>
                            </NavLink>
                            <NavLink to={"/user/chats"} className={linkClass}>
                                <MessageSquare size={17} strokeWidth={2} />
                                <span className="hidden sm:inline">Chats</span>
                            </NavLink>
                            {user.role === "admin" && (
                                <NavLink
                                    to={"/admin/analytic"}
                                    className={({ isActive }) =>
                                        `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-danger-soft text-danger"
                                                : "text-muted hover:bg-danger-soft hover:text-danger"
                                        }`
                                    }
                                >
                                    <Shield size={17} strokeWidth={2} />
                                    <span className="hidden sm:inline">Admin</span>
                                </NavLink>
                            )}

                            <div className="mx-1 h-6 w-px bg-line" />

                            <div ref={notificationRef} className="relative">
                                <button
                                    aria-label="Notifications"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                                        isOpen
                                            ? "bg-primary-soft text-primary"
                                            : "text-muted hover:bg-surface-muted hover:text-ink"
                                    }`}
                                >
                                    <Bell size={18} strokeWidth={2} />
                                </button>

                                {isOpen && <Notifications setIsOpen={setIsOpen} />}
                            </div>

                            <button
                                onClick={logout}
                                className="ml-1 inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                            >
                                <LogOut size={17} strokeWidth={2} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <NavLink to={"/user/login"} className={linkClass}>
                                Sign in
                            </NavLink>
                            <NavLink
                                to={"/user/register"}
                                className="btn-primary px-4 py-2 text-sm"
                            >
                                Sign up
                            </NavLink>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
};

export default Nav;
