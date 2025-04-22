import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const { signup, isLoading, isLoggedIn } = useAuth()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        const res = await signup(email, password, name, phone)
        if (res) {
            router.push('/dashboard');
        }
    };

    useEffect(() => {


        if (isLoggedIn) {
            router.push('/dashboard');
        }


    }, [isLoggedIn , router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSignup} className="space-y-4 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-full rounded-md transition"
                >
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
