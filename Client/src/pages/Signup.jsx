
// import React, { useState,useEffect } from "react";
// import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, CheckCircle } from "lucide-react";
// import { NavLink} from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store/authSlice";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";



// const registerSchema = z.object({
//   firstName: z.string().min(3, "Name should be at least 3 letters"),
//   emailId: z.string().email("Invalid email"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   contact: z
//     .string()
//     .min(10, "Contact number must be at least 10 digits")
//     .max(10, "Contact number must be exactly 10 digits"),
// });

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);


//   useEffect(() => {
//     if (isAuthenticated) navigate("/");
//   }, [isAuthenticated, navigate]);


//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(registerSchema) });

//    const sendData = (data) => {
//       dispatch(registerUser(data));
//    };

//   const handleGoogle = () => {
//     alert("Mock: Launch Google OAuth flow");
//   };

//   return (
//       <div className="min-h-screen bg-linear-to-br from-emerald-200/50 via-teal-50/30 to-cyan-50/50 flex items-center justify-center p-6">
//           <div className="w-full max-w-5xl">
//               <div className="text-center mb-8">
//                   <h1 className="text-3xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
//                     Create Account
//                   </h1>
//                   <p className="text-slate-600 mt-1">Join KaamSetu and find work today</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//                   <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
//                     <form onSubmit={handleSubmit(sendData)} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
//                         <div className="relative">
//                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                           <input
//                             name="firstName"
//                             // value={formData.firstName}
//                             // onChange={handleChange}
//                             placeholder="John Doe"
//                             className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                               errors.firstName ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                             }`}
//                             {...register("firstName")}
//                           />
//                         </div>
//                         {errors.firstName && <p className="text-rose-600 text-xs mt-2">⚠ {errors.firstName}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
//                         <div className="relative">
//                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                           <input
//                             name="emailId"
//                             type="email"
//                             placeholder="john@example.com"
//                             className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                               errors.emailId ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                             }`}
//                             {...register("emailId")}
//                           />
//                         </div>
//                         {errors.emailId && <p className="text-rose-600 text-xs mt-2">⚠ {errors.emailId}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-slate-900 mb-2">Contact Number</label>
//                         <div className="relative">
//                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                           <input
//                             name="contact"
//                             placeholder="9876543210"
//                             maxLength={10}
//                             className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                               errors.contact ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                             }`}
//                             {...register("contact")}
//                           />
//                         </div>
//                         {errors.contact && <p className="text-rose-600 text-xs mt-2">⚠ {errors.contact}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
//                         <div className="relative">
//                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                           <input
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter password"
//                             className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                               errors.password ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                             }`}
//                             {...register("password")}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
//                             aria-label={showPassword ? "Hide password" : "Show password"}
//                           >
//                             {showPassword ? "🙈" : "👁️"}
//                           </button>
//                         </div>
//                         {errors.password && <p className="text-rose-600 text-xs mt-2">⚠ {errors.password}</p>}
//                       </div>
//                       <div>
//                         <button
//                           onClick={handleSubmit}
//                           type="submit"
//                           disabled={loading}
//                           className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-transform ${
//                             loading ? "bg-slate-400 cursor-not-allowed" : "bg-linear-to-r from-emerald-500 to-teal-500 hover:scale-[1.02]"
//                           }`}
//                         >
//                           {loading ? (
//                             <span className="inline-flex items-center gap-2">
//                               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Registering...
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-2">Register <ArrowRight className="w-5 h-5" /></span>
//                           )}
//                         </button>
//                       </div>
//                       <p className="text-xs text-slate-500 text-center mt-2">
//                         By registering, you agree to our Terms of Service and Privacy Policy.
//                       </p>
//                     </form>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col gap-4">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-sm font-semibold text-slate-900">Sign in with</h3>
//                           <p className="text-xs text-slate-500 mt-1">Quickly create an account using your Google identity</p>
//                         </div>
//                         <div className="text-xs text-slate-400">Fast • Secure</div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
//                         <button
//                           onClick={handleGoogle}
//                           className="flex-1 flex items-center gap-3 justify-center py-3 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition font-semibold text-slate-700"
//                         >
//                           <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
//                           Continue with Google
//                         </button>
//                         <button
//                           onClick={() => document.querySelector('input[name="firstName"]')?.focus()}
//                           className="mt-3 sm:mt-0 inline-flex items-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-100 transition"
//                         >
//                           Continue with Email
//                         </button>
//                       </div>
//                     </div>
//                     <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
//                       <h4 className="text-sm font-semibold text-slate-900 mb-3">Why KaamSetu?</h4>
//                       <ul className="space-y-3 text-sm text-emerald-700">
//                         <li className="flex items-center gap-3">
//                           <CheckCircle className="w-5 h-5" />
//                           <span>Find verified local jobs</span>
//                         </li>
//                         <li className="flex items-center gap-3">
//                           <CheckCircle className="w-5 h-5" />
//                           <span>Secure payment protection</span>
//                         </li>
//                         <li className="flex items-center gap-3">
//                           <CheckCircle className="w-5 h-5" />
//                           <span>Fair dispute resolution</span>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm text-slate-600">Already have an account?</p>
//                       <NavLink to="/login" className="mt-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors">Login</NavLink>
//                     </div>
//                   </div>
//               </div>
//               <div className="mt-10 text-center text-xs text-slate-500">
//                   <p>© {new Date().getFullYear()} KaamSetu — By registering you agree to our Terms.</p>
//               </div>
//           </div>
//       </div>
//   );
// };

// export default Register;







import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const registerSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 letters"),
  emailId: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number must be exactly 10 digits"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const firstNameInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const handleGoogle = () => {
    alert("Mock: Launch Google OAuth flow");
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-200/50 via-teal-50/30 to-cyan-50/50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-600 mt-1">Join KaamSetu and find work today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    name="firstName"
                    placeholder="John Doe"
                    ref={firstNameInputRef}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
                      errors.firstName ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
                    }`}
                    {...register("firstName")}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-rose-600 text-xs mt-2">⚠ {errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    name="emailId"
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
                      errors.emailId ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
                    }`}
                    {...register("emailId")}
                  />
                </div>
                {errors.emailId && (
                  <p className="text-rose-600 text-xs mt-2">⚠ {errors.emailId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    name="contact"
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
                      errors.contact ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
                    }`}
                    {...register("contact")}
                  />
                </div>
                {errors.contact && (
                  <p className="text-rose-600 text-xs mt-2">⚠ {errors.contact.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
                      errors.password ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-600 text-xs mt-2">⚠ {errors.password.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-transform ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-linear-to-r from-emerald-500 to-teal-500 hover:scale-[1.02]"
                  }`}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Register <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-2">
                By registering, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Right: Info / Google */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Sign in with</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Quickly create an account using your Google identity
                  </p>
                </div>
                <div className="text-xs text-slate-400">Fast • Secure</div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={handleGoogle}
                  className="flex-1 flex items-center gap-3 justify-center py-3 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition font-semibold text-slate-700"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
                <button
                  onClick={() => firstNameInputRef.current?.focus()}
                  className="mt-3 sm:mt-0 inline-flex items-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-100 transition"
                >
                  Continue with Email
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Why KaamSetu?</h4>
              <ul className="space-y-3 text-sm text-emerald-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Find verified local jobs</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Secure payment protection</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Fair dispute resolution</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-600">Already have an account?</p>
              <NavLink
                to="/login"
                className="mt-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-slate-500">
          <p>© {currentYear} KaamSetu — By registering you agree to our Terms.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
