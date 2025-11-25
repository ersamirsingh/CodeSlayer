import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
    // integrate Google OAuth here
    alert("Mock: Launch Google OAuth flow (replace with real flow)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 via-indigo-800 to-purple-700 p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20"
        >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-4xl font-extrabold text-white mb-8"
        >
          KaamSetu 🔐
        </motion.h2>

        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-2 mb-4 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}
          <form onSubmit={handleSubmit(sendData)} className="space-y-6">
            <div>
              <label className="block text-white/90 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`w-full input input-bordered focus:outline-none bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl py-3 px-4 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                  errors.emailId ? 'border-red-400' : ''
                }`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <p className="text-red-300 text-sm mt-1">{errors.emailId.message}</p>
              )}
            </div>


            <div>
              <label className="block text-white/90 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={`w-full input input-bordered bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl py-3 px-4 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                    errors.password ? 'border-red-400' : ''
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white transition"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                loading
                  ? 'bg-blue-400/40 cursor-not-allowed text-white/80'
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-blue-600/40'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
          <div className="divider my-6">OR</div>

        <div>
          <button
            onClick={handleGoogle}
            className="btn btn-outline w-2/3 ml-17 flex items-center justify-center gap-3"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-white/80"
        >
          <span>Don’t have an account? </span>
          <NavLink
            to="/signup"
            className="text-blue-300 hover:text-blue-400 underline transition-all duration-200"
          >
            Sign Up
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;



// import React, { useState } from "react";
// import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     emailId: "",
//     password: ""
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
//       newErrors.emailId = "Invalid Email";
//     }
    
//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setLoading(true);
//       // Simulate API call
//       setTimeout(() => {
//         setLoading(false);
//         alert("Login successful!");
//       }, 1500);
//     }
//   };

//   const handleGoogle = () => {
//     alert("Mock: Launch Google OAuth flow");
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-5" />
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5" />
//       </div>

//       {/* Left Side - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-600">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
//           <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
//         </div>
        
//         <div className="relative z-10 max-w-md">
//           <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl">
//             <span className="text-4xl font-black text-white">KS</span>
//           </div>
          
//           <h1 className="text-5xl font-black text-white mb-6 leading-tight">
//             Welcome Back to KaamSetu
//           </h1>
          
//           <p className="text-xl text-white/90 mb-12 leading-relaxed">
//             Sign in to access your dashboard and find local work opportunities.
//           </p>

//           <div className="space-y-4">
//             <div className="flex items-center gap-4 text-white/90">
//               <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                 <Shield className="w-6 h-6" />
//               </div>
//               <div>
//                 <div className="font-bold text-white">Secure Platform</div>
//                 <div className="text-sm text-white/80">Your data is protected</div>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 text-white/90">
//               <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" />
//               </div>
//               <div>
//                 <div className="font-bold text-white">Verified Jobs</div>
//                 <div className="text-sm text-white/80">Only trusted employers</div>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 text-white/90">
//               <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                 <Zap className="w-6 h-6" />
//               </div>
//               <div>
//                 <div className="font-bold text-white">Quick Access</div>
//                 <div className="text-sm text-white/80">Find work instantly</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
//         <div className="relative w-full max-w-md">
//           {/* Logo for mobile */}
//           <div className="lg:hidden text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 mb-4 shadow-lg shadow-emerald-500/30">
//               <span className="text-2xl font-black text-white">KS</span>
//             </div>
//             <h1 className="text-3xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-slate-600 font-medium">Sign in to your account</p>
//           </div>

//           {/* Desktop Header */}
//           <div className="hidden lg:block mb-8">
//             <h2 className="text-3xl font-black text-slate-900 mb-2">Sign In</h2>
//             <p className="text-slate-600 font-medium">Enter your credentials to access your account</p>
//           </div>

//           {/* Main Form Card */}
//           <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-8">
//             <div className="space-y-5">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="email"
//                     name="emailId"
//                     value={formData.emailId}
//                     onChange={handleChange}
//                     placeholder="john@example.com"
//                     className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                       errors.emailId
//                         ? "border-rose-400 focus:border-rose-500"
//                         : "border-slate-200 focus:border-emerald-400 focus:bg-white"
//                     }`}
//                   />
//                 </div>
//                 {errors.emailId && (
//                   <p className="text-rose-600 text-xs font-semibold mt-2 flex items-center gap-1">
//                     <span>⚠</span> {errors.emailId}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-bold text-slate-900">Password</label>
//                   <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
//                     Forgot?
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter password"
//                     className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                       errors.password
//                         ? "border-rose-400 focus:border-rose-500"
//                         : "border-slate-200 focus:border-emerald-400 focus:bg-white"
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-rose-600 text-xs font-semibold mt-2 flex items-center gap-1">
//                     <span>⚠</span> {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2"
//                 />
//                 <label htmlFor="remember" className="ml-2 text-sm font-semibold text-slate-700">
//                   Remember me
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//                   loading
//                     ? "bg-slate-400 cursor-not-allowed"
//                     : "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:scale-[1.02]"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Logging in...
//                   </>
//                 ) : (
//                   <>
//                     Login <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-linear-to-br from-white to-slate-50 text-slate-500 font-semibold">OR</span>
//               </div>
//             </div>

//             {/* Google OAuth */}
//             <button
//               onClick={handleGoogle}
//               className="w-full py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]"
//             >
//               <img 
//                 src="https://www.svgrepo.com/show/475656/google-color.svg" 
//                 alt="Google" 
//                 className="w-5 h-5" 
//               />
//               Continue with Google
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <div className="text-center mt-6">
//             <span className="text-slate-600 font-medium">Don't have an account? </span>
//             <button className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
//               Sign Up
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8 text-xs text-slate-500">
//             <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;