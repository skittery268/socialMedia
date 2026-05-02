// Hooks
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

// Register page
const Register = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        name: "",
        email: "",
        password: ""
    });

    const { register } = useAuth();

    return (
        <form onSubmit={(e) => { handleSubmit(e, register), resetForm() }}>
            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
            <br />
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            <br />
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            <br />
            <button>Register</button>
        </form>
    )
}

export default Register;