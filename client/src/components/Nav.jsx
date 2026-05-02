// React Router
import { NavLink } from "react-router"

// Hooks
import { useAuth } from "../hooks/useAuth";

// Navigation component
const Nav = () => {
    const { user, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul>
                    {
                        user ? (
                            <>
                                <li><NavLink to={"/"}>Home</NavLink></li>
                                <li><NavLink to={"/profile"}>Profile</NavLink></li>
                                <li><NavLink to={"/users"}>Users</NavLink></li>
                                <li><NavLink to={"/chats"}>Chats</NavLink></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to={"/login"}>Login</NavLink></li>
                                <li><NavLink to={"/register"}>Register</NavLink></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Nav;