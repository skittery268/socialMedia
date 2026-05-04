// React Router
import { NavLink } from "react-router"

// Hooks
import { useAuth } from "../hooks/useAuth";

import userIcon from "../assets/icons/user.png"
import { useState } from "react";

// Navigation component
const Nav = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex justify-center items-center">
            <nav className="flex justify-between text-center w-[90%] relative">
                <NavLink to={"/"}>DevLink</NavLink>
                {
                    user ? (
                        <>
                            <NavLink to={"/"}>Home</NavLink>
                            <NavLink to={"/friendlist"}>Friends</NavLink>
                            <button 
                                className={"h-10 cursor-pointer"} 
                                onClick={() => setIsOpen(!isOpen)}
                                >
                                <img 
                                    src={user.image?.url ? user.image.url : userIcon} 
                                    className="h-10" 
                                />
                            </button>
                            {
                                isOpen && (
                                    <section 
                                        className="absolute right-1 z-100 bg-white shadow-2xl rounded-[10px] h-100 w-80 top-12"
                                        >
                                        <div>
                                            <img 
                                                src={user.image?.url ? user.image.url : userIcon} 
                                                className="h-" 
                                            />
                                        </div>
                                    </section>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <NavLink to={"/login"}>Login</NavLink>
                            <NavLink to={"/register"}>Register</NavLink>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Nav;

/* 
<NavLink to={"/"}>Home</NavLink>
<NavLink to={"/profile"}>Profile</NavLink>
<NavLink to={"/users"}>Users</NavLink>
<NavLink to={"/chats"}>Chats</NavLink>
<NavLink to={"/noti"}>Notifications</NavLink>
<NavLink to={"/friendlist"}>Friend List</NavLink>
<button onClick={logout}>Logout</button>
*/