// Hooks
import { Link } from "react-router";
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
        <form 
            onSubmit={(e) => { handleSubmit(e, register), resetForm() }}
            className="mt-20 bg-white h-100 w-80 rounded-[20px] flex justify-center items-center flex-col relative shadow-2xl"
            >
            <h1 className="absolute top-5 text-[25px]">Sign Up</h1>
            <input 
                type="text" 
                name="name" 
                placeholder="Username" 
                value={formData.name} 
                onChange={handleChange}
                className="w-60 h-10 flex justify-center items-center pl-5 pr-5 bg-[#F8FAFC] border border-gray-300 rounded-[10px] outline-none focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <br />
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-60 h-10 flex justify-center items-center pl-5 pr-5 bg-[#F8FAFC] border border-gray-300 rounded-[10px] outline-none focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
            />
            <br />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange}
                className="w-60 h-10 flex justify-center items-center pl-5 pr-5 bg-[#F8FAFC] border border-gray-300 rounded-[10px] outline-none focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
            />
            <br />
            <button className="absolute bottom-17 bg-[#3B82F6] text-white w-60 h-10 rounded-[10px] cursor-pointer transition duration-200 hover:scale-102 hover:bg-[#2b7cfe]">Create Account</button>
            <p className="absolute bottom-5 text-[13px] text-gray-500">Already have an account? <Link className="text-blue-700" to={"/login"}>Login</Link></p>
        </form>
    )
}

export default Register;