// React Router
import { Navigate, Route, Routes } from "react-router";

// Components
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./components/Chat";
import Group from "./components/Group";
import AllowedToAdminRoute from "./components/AllowedToAdminRoute";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import UsersProfile from "./pages/UsersProfile";
import Chats from "./pages/Chats";
import UserDashboard from "./pages/UserDashboard";
import Admin from "./pages/AdminDashboard";
import Analytic from "./pages/Analytic";
import UsersAdmin from "./pages/UsersAdmin";
import PostsAdmin from "./pages/PostsAdmin";

const App = () => {
	// Check if user is authenticated
	const { user, loading } = useAuth();

	// If not user and still loading, show loading component
	if (!user && loading) {
		return <Loading />
	} 

    return (
		<main className="h-screen bg-[#F3F2EF]">
			{/* All Routes */}
			<Routes>
				<Route path="/" element={<Navigate to={"/user"} />} />

				<Route path="/user" element={<UserDashboard />}>
					<Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					<Route path="chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
					<Route path="group/:id" element={<ProtectedRoute><Group /></ProtectedRoute>} />
					<Route path="usersprofile/:id" element={<ProtectedRoute><UsersProfile /></ProtectedRoute>} />
					<Route path="chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
				</Route>

				<Route path="/admin" element={<ProtectedRoute><AllowedToAdminRoute><Admin /></AllowedToAdminRoute></ProtectedRoute>}>
					<Route path="analytic" element={<Analytic />} />
					<Route path="users" element={<UsersAdmin />} />
					<Route path="posts" element={<PostsAdmin />} />
				</Route>
			</Routes>
		</main>
    )
}

export default App;