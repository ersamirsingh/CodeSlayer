/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from '../store/authSlice';

const loginSchema = z.object({
  emailId: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const sendData = (data) => {
    dispatch(loginUser(data));
  };

  const handleGoogle = () => {
    alert("Mock: Launch Google OAuth flow (replace with real flow)");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-200/50 via-teal-50/30 to-cyan-50/50">
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
        <div className="relative w-full max-w-md">

          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Login </h2>
            <p className="text-slate-600 font-medium">Enter your credentials to access your account</p>
          </div>

          <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-8">
      

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
                      errors.emailId
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-slate-200 focus:border-emerald-400 focus:bg-white"
                    }`}
                    {...register('emailId')}
                  />
                </div>
                {errors.emailId && (
                  <p className="text-rose-600 text-xs font-semibold mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.emailId.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-900">Password</label>
                  <button type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
                      errors.password
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-slate-200 focus:border-emerald-400 focus:bg-white"
                    }`}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-600 text-xs font-semibold mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2"
                />
                <label htmlFor="remember" className="ml-2 text-sm font-semibold text-slate-700">
                  Remember me
                </label>
              </div>

              <button
                onClick={handleSubmit(sendData)}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Logging in...
                  </>
                ) : (
                  <>Login <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-linear-to-br from-white to-slate-50 text-slate-500 font-semibold">OR</span>
              </div>
            </div>

            <button
              onClick={handleGoogle}
              className="w-full py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]"
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="w-5 h-5" 
              />
              Continue with Google
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-slate-600 font-medium">Don't have an account? </span>
            <NavLink to="/signup" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              Sign Up
            </NavLink>
          </div>

          <div className="text-center mt-8 text-xs text-slate-500">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

