// React Router
import { NavLink } from "react-router"

// Hooks
import { useAuth } from "../hooks/useAuth";

// Navigation component
const Nav = () => {
    const { user, logout } = useAuth();

    return (
        <header className="flex justify-center items-center w-full h-25 border-b border-b-[#dedddb] bg-[#FFFFFF]">
            <nav className="flex justify-between items-center w-350">
                <NavLink to={!user ? "/login" : "/"} className="text-[30px] ml-5">DevLink</NavLink>
                {
                    user ? (
                        <div className="flex gap-4">
                            <NavLink to={"/"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Home</span></NavLink>
                            <NavLink to={"/profile"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Profile</span></NavLink>
                            <NavLink to={"/users"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Users</span></NavLink>
                            <NavLink to={"/chats"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Chats</span></NavLink>
                            <NavLink to={"/noti"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Notifications</span></NavLink>
                            <button onClick={logout} className="cursor-pointer w-20 h-10 bg-red-700 rounded-[30px] mr-5 text-white hover:bg-red-600">Logout</button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <NavLink to={"/login"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Sign in</span></NavLink>
                            <NavLink to={"/register"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Sign up</span></NavLink>
                        </div>
                    )
                }
            </nav>
        </header>
    )
}

export default Nav;