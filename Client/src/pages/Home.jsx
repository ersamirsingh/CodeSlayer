import React, { useState, useRef, useEffect } from "react";
import { Bell, Menu, X, User, LogOut, Settings, Home as HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import EmployerPlatform from "./EmployerPlatform";


// eslint-disable-next-line no-unused-vars
export default function Home({ userName = "Nitish", onLogout = () => {}, onNavigate = (path) => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const handleLogout =()=>{
    setMobileOpen(false)
    dispatch(logoutUser())
    navigate('/')
  }


  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo / Brand */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                KS
              </div>
              <div>
                <div className="text-lg font-extrabold leading-tight">KaamSetu</div>
                <div className="text-xs text-gray-500 -mt-0.5">Local work • Fair pay</div>
              </div>
            </div>
          </div>

          {/* Middle: optional nav (hidden on small screens) */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/jobs" onClick={() => navigate("/jobs")} className="text-sm text-gray-700 hover:text-indigo-600">
              Jobs
            </Link>
            <Link to="/applications" onClick={() => navigate("/applications")} className="text-sm text-gray-700 hover:text-indigo-600">
              Applications
            </Link>
            <Link to="/disputes" onClick={() => navigate("/disputes")} className="text-sm text-gray-700 hover:text-indigo-600">
              Disputes
            </Link>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-md hover:bg-gray-100"
              aria-label="Notifications"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">
                3
              </span>
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center gap-3 p-1 rounded-md hover:bg-gray-100"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((s) => !s)}
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {initials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-800">{userName}</div>
                  <div className="text-xs text-gray-500">Worker</div>
                </div>
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  aria-label="Profile menu"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
                >
                  <button
                    onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>

                  <button
                    onClick={() => { setProfileOpen(false); navigate("/settings"); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>

                  <div className="border-t my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu (collapsible) */}
        {mobileOpen && (
          <div className="md:hidden mt-2 pb-4 border-t">
            <div className="flex flex-col gap-2 pt-3">
              <button onClick={() => { setMobileOpen(false); navigate("/jobs"); }} className="text-left px-3 py-2 rounded hover:bg-gray-100">Jobs</button>
              <button onClick={() => { setMobileOpen(false); navigate("/applications"); }} className="text-left px-3 py-2 rounded hover:bg-gray-100">Applications</button>
              <button onClick={() => { setMobileOpen(false); navigate("/disputes"); }} className="text-left px-3 py-2 rounded hover:bg-gray-100">Disputes</button>
              <div className="pt-2 border-t">
                <button onClick={() => { setMobileOpen(false); navigate("/profile"); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button onClick={() => { setMobileOpen(false); navigate("/settings"); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button onClick= {handleLogout} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 text-red-600">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
    <EmployerPlatform/>
    </>
  );
}
