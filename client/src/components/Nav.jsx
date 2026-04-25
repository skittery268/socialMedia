import { NavLink } from "react-router"
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
    const { user, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul>
                    {
                        user ? (
                            <>
                                <li><NavLink to={"/home"}>Home</NavLink></li>
                                <li><NavLink to={"/profile"}>Profile</NavLink></li>
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