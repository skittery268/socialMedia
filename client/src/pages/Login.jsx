import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        email: "",
        password: ""
    });

    const { login } = useAuth();

    return (
        <form onSubmit={(e) => { handleSubmit(e, login), resetForm() }}>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            <br />
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            <br />
            <button>Login</button>
        </form>
    )
}

export default Login;