import { NavLink, useNavigate } from "react-router";

const AdminNav = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <div className="w-50 h-screen bg-[#eeede3] border-r border-r-gray-300">
                <h1 className="text-gray-600 ml-4 pt-5">ADMIN PANEL</h1>
                <NavLink to={"/admin/analytic"} className={({ isActive }) => `${isActive ? "bg-white border-l-red-800 text-red-800" : "border-l-white"} pl-10 mt-4 border-l-3 hover:bg-white h-10 flex items-center`}>Analytics</NavLink>
                <NavLink to={"/admin/users"} className={({ isActive }) => `${isActive ? "bg-white border-l-red-800 text-red-800" : "border-l-white"} pl-10 border-l-3 hover:bg-white h-10 flex items-center`}>Users</NavLink>
                <NavLink to={"/admin/posts"} className={({ isActive }) => `${isActive ? "bg-white border-l-red-800 text-red-800" : "border-l-white"} pl-10 border-l-3 hover:bg-white h-10 flex items-center`}>Posts</NavLink>
                <button onClick={() => navigate("/user/profile")} className={`pl-10 border-l-3 border-l-white hover:bg-white h-10 flex items-center w-full cursor-pointer`}>User Mode</button>
            </div>
        </nav>
    )
}

export default AdminNav;