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
				<Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
				<Route path="/usersprofile/:id" element={<ProtectedRoute><UsersProfile /></ProtectedRoute>} />
			</Routes>
		</>
    )
}

export default App;