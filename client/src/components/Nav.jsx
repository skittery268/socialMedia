// React Router
import { NavLink } from "react-router"

// Hooks
import { useAuth } from "../hooks/useAuth";

// Images
import activeNotification from "../assets/icons/notificationActive.png";
import inactiveNotification from "../assets/icons/notificationInactive.png";
import { useEffect, useRef, useState } from "react";

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

    return (
        <>
            <div className="w-full h-25"></div>
            <header className="flex justify-center items-center w-full h-25 border-b border-b-[#dedddb] bg-[#FFFFFF] fixed z-50 top-0">
                <nav className="flex justify-between items-center w-350">
                    <div className="flex justify-center items-center gap-5">
                        <NavLink to={!user ? "/user/login" : "/user/home"} className="text-[30px] ml-5">DevLink</NavLink>
                        <SearchBar mode={"users"} />
                    </div>

                    {
                        user ? (
                            <div className="flex justify-center items-center gap-4">
                                <NavLink to={"/user/home"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Home</span></NavLink>
                                <NavLink to={"/user/profile"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Profile</span></NavLink>
                                <NavLink to={"/user/chats"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Chats</span></NavLink>
                                {
                                    user.role === "admin" && (
                                        <NavLink to={"/admin/analytic"} className={({ isActive }) => `${isActive ? "text-red-400 border-b-2 border-b-red-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Admin Mode</span></NavLink>
                                    )
                                }
                                <div ref={notificationRef} className="relative">
                                    <button 
                                        className={`h-10 w-10 flex justify-center items-center cursor-pointer transition duration-200 rounded-full ${isOpen ? "bg-blue-200" : "bg-gray-200"}`} 
                                        onClick={() => setIsOpen(!isOpen)}
                                        >
                                        {
                                            isOpen ? (
                                                <img className="h-5" src={activeNotification} />
                                            ) : (
                                                <img className="h-5" src={inactiveNotification} />
                                            )
                                        }
                                    </button>
                                    
                                    { isOpen && <Notifications setIsOpen={setIsOpen} /> }
                                </div>
                                <button onClick={logout} className="cursor-pointer w-20 h-10 bg-red-700 rounded-[30px] mr-5 text-white hover:bg-red-600">Logout</button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <NavLink to={"/user/login"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Sign in</span></NavLink>
                                <NavLink to={"/user/register"} className={({ isActive }) => `${isActive ? "text-blue-400 border-b-2 border-b-blue-400" : "border-b-2 border-b-white"} p-2 flex justify-center items-center transition duration-200 cursor-auto`}><span className="hover:-translate-y-1 transition duration-200 h-full w-full cursor-pointer">Sign up</span></NavLink>
                            </div>
                        )
                    }
                </nav>
            </header>
        </>
    )
}

export default Nav;