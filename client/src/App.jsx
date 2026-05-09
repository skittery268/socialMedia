// React Router
import { Route, Routes } from "react-router";

// Components
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./components/Chat";
import Group from "./components/Group";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import UsersProfile from "./pages/UsersProfile";
import Chats from "./pages/Chats";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
	// Check if user is authenticated
	const { user, loading } = useAuth();

	// If not user and still loading, show loading component
	if (!user && loading) {
		return <Loading />
	} 

    return (
		<main className="h-screen bg-[#F3F2EF]">
			<Nav />

			{/* All Routes */}
			<div className="flex justify-center items-center">
				<Routes>
					<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					<Route path="/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
					<Route path="/group/:id" element={<ProtectedRoute><Group /></ProtectedRoute>} />
					<Route path="/usersprofile/:id" element={<ProtectedRoute><UsersProfile /></ProtectedRoute>} />
					<Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
					<Route path="/adminpanel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
				</Routes>
			</div>
		</main>
    )
}

export default App;