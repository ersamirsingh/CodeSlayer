import React, { useEffect, useRef, useState } from "react";
import { Bell, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";

export default function AppHeader({ user = {}, onSearch = () => {} }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const initials = (user?.firstName || "U").split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-slate-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-3 focus:outline-none">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 grid place-items-center text-white font-bold shadow">
                KS
              </div>
            </button>

            <div className="hidden sm:flex items-center ml-2">
              <div className="relative">
                <input
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search jobs, applicants..."
                  className="pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-transparent focus:border-teal-300 dark:focus:border-cyan-600 outline-none shadow-sm w-80"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex items-center gap-3">
              <nav className="flex items-center gap-6 text-sm font-medium">
                <Link to="/jobpage" className="text-slate-700 hover:text-teal-600 transition">
                  Jobs
                </Link>
                <Link to="/featurespage" className="text-slate-700 hover:text-teal-600 transition">
                  Features
                </Link>
                <Link to="/aboutpage" className="text-slate-700 hover:text-teal-600 transition">
                  About
                </Link>
              </nav>
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition" aria-label="Notifications" onClick={() => navigate("/notifications")}>
              <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </button>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(s => !s)}
                className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <div className="w-9 h-9 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 grid place-items-center text-white font-semibold">
                  {initials}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <div className="text-sm font-medium">{user?.firstName || "User"}</div>
                  <div className="text-xs text-slate-500">Worker</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {profileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <button onClick={() => { setProfileOpen(false); navigate("/user/dashboard"); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</button>
                  <button onClick={() => { setProfileOpen(false); navigate("/user/profile"); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Settings</button>
                  <div className="border-t my-1 border-slate-100 dark:border-gray-800" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-slate-50">Logout</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
