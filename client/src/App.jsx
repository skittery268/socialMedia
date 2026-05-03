// React Router
import { Route, Routes } from "react-router";

// Components
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";
import Chat from "./components/Chat";
import Group from "./components/Group";
import Notifications from "./components/Notifications";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import UsersProfile from "./pages/UsersProfile";
import Chats from "./pages/Chats";
import FriendList from "./components/FriendList";

const App = () => {
	// Check if user is authenticated
	const { user, loading } = useAuth();

	// If not user and still loading, show loading component
	if (!user && loading) {
		return <Loading />
	}

    return (
		<>
			<Nav />

			{/* All Routes */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
				<Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
				<Route path="/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
				<Route path="/group/:id" element={<ProtectedRoute><Group /></ProtectedRoute>} />
				<Route path="/usersprofile/:id" element={<ProtectedRoute><UsersProfile /></ProtectedRoute>} />
				<Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
				<Route path="/noti" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
				<Route path="/friendlist" element={<ProtectedRoute><FriendList /></ProtectedRoute>} />
			</Routes>
		</>
    )
}

export default App;