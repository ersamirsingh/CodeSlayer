import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted: Add backend login API integration", form); 
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-400 via-indigo-300 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
        <div className="w-full max-w-md from-blue-400 via-indigo-300 to-green-200 rounded-2xl shadow-xl p-8 borde">
        
            <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-primary dark:text-blue-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to your <span className="font-semibold">KaamSetu</span> account</p>
            </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email / Phone</label>  
                <input
                type="text"
                required
                placeholder="Enter your email or phone"
                className="input input-bordered w-full mt-1 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Password</label>
                <div className="relative mt-1">
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-900 dark:border-gray-700 pr-10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <button
                to="/forgot-password"
                className="text-primary hover:underline dark:text-blue-400"
                >
                Forgot password?
                </button>
            </div>

            <button
                type="submit"
                className=" btn btn-primary w-full mt-2"
            >
                Login
            </button>
            </form>

        
            <div className="divider text-gray-400 text-sm my-6">or continue with</div>


            <div className="flex justify-center gap-4">
            <button className="btn btn-outline btn-sm">
                <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
                />
                <span>Google</span>
            </button>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            New user?{" "}
            <button to="/signup" className="text-primary hover:underline dark:text-blue-400">
                Create an account
            </button>
            </p>
        </div>
    </main>

  );
}