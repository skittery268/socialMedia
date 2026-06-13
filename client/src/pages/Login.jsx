// React tools
import { Link } from "react-router";
import { useState } from "react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

// Icons
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// Login page
const Login = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        email: "",
        password: ""
    });
    const [isHidden, setIsHidden] = useState(true);

    const { login } = useAuth();

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-12">
            <form
                onSubmit={(e) => { handleSubmit(e, login); resetForm() }}
                className="card w-full max-w-sm animate-scale-in p-8"
            >
                <div className="mb-7 flex flex-col gap-1.5">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted">Sign in to continue to DevLink.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Email</span>
                        <div className="relative">
                            <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="field h-11 pl-10 pr-3.5 text-sm"
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-body">Password</span>
                        <div className="relative">
                            <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
                            <input
                                type={isHidden ? "password" : "text"}
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="field h-11 pl-10 pr-10 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setIsHidden(!isHidden)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-faint transition-colors hover:text-body"
                                aria-label={isHidden ? "Show password" : "Hide password"}
                            >
                                {isHidden ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </label>

                    <button type="submit" className="btn-primary mt-1 h-11 w-full text-sm">
                        Sign in
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-muted">
                    Don&apos;t have an account?{" "}
                    <Link className="font-medium text-primary hover:text-primary-hover" to={"/user/register"}>
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
