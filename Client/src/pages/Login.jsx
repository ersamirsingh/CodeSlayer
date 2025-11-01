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
