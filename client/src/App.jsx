import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import Loading from "./components/Loading";

const App = () => {
	const { user, loading } = useAuth();

	if (!user && loading) {
		return <Loading />
	}

    return (
		<>
			<Nav />

			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</>
    )
}

export default App;