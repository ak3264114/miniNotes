import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const { login, isLoggedIn, isLoading } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await login(email, password);
        if (res) {
            router.push('/dashboard');
        }
        
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard');
        }

    }, [isLoggedIn]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center">Login to Your Account</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="flex items-center justify-center">
                    <span className="text-gray-500 text-sm">or</span>
                </div>

                <p className="text-center text-sm text-gray-600">
                    {"Don't have an account? "}
                    <a href="/auth/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
