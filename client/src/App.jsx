import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";
import Chat from "./components/Chat";
import UsersProfile from "./pages/UsersProfile";
import Chats from "./pages/Chats";
import Group from "./components/Group";

const App = () => {
	const { user, loading } = useAuth();

	if (!user && loading) {
		return <Loading />
	}

    return (
		<>
			<Nav />

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
			</Routes>
		</>
    )
}

export default App;