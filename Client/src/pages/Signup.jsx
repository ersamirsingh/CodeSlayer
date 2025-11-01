import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";


export default function Signup() {
//   const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // console("replace with real API call: POST /auth/register")
    await new Promise((r) => setTimeout(r, 800));
    console.log("Signup data (mock):", form);
    setSubmitting(false);
    // navigate("/login");
  };

  const handleGoogle = () => {
    // integrate Google OAuth here
    alert("Mock: Launch Google OAuth flow (replace with real flow)");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-400 via-indigo-300 to-green-100 p-6">
        <div className="w-full max-w-md from-blue-400 via-indigo-300 to-green-200 rounded-2xl shadow-lg p-8">
            
            <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-primary">Create an account</h1>
            <p className="text-sm text-gray-600 mt-1">Sign up with your email or continue with Google</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input input-bordered w-full mt-1"
                placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input input-bordered w-full mt-1"
                placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1">
                <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input input-bordered w-full pr-10 "
                    placeholder="Choose a secure password"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-3 text-gray-500"
                    aria-label="Toggle password visibility"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={submitting}
            >
                {submitting ? "Creating..." : "Create Account"}
            </button>
            </form>

            <div className="divider text-gray-400 text-sm my-6">or continue with</div>

            <div className="flex justify-center gap-4">
            <button onClick={handleGoogle} className="btn btn-outline btn-sm">
                <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
                />
                <span>Google</span>
            </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            {/* <Link to="/login" className="text-primary font-medium hover:underline">Login</Link> */}
            </p>
        </div>
    </main>
  );
}
