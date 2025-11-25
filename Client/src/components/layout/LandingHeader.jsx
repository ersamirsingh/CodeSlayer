

import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate?.() || (() => {});

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md dark:bg-gray-900/60 border-b border-slate-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              aria-label="Go home"
              className="inline-flex items-center gap-3 focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-teal-500 to-cyan-500 grid place-items-center font-extrabold text-white shadow-md">
                KS
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  KaamSetu
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Empowering Rural Workers
                </div>
              </div>
            </button>
          </div>

          {/* Desktop nav + CTA */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link to="/labour" className="text-slate-700 hover:text-teal-600 transition">
                Jobs
              </Link>
              <Link to="/features" className="text-slate-700 hover:text-teal-600 transition">
                Features
              </Link>
              <Link to="/about" className="text-slate-700 hover:text-teal-600 transition">
                About
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-md hover:from-teal-600 hover:to-cyan-600 transition"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-3 border-t border-slate-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <div className="space-y-1">
              <a href="#jobs" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                Jobs
              </a>
              <a href="#features" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                Features
              </a>
              <a href="#about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                About
              </a>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-gray-800">
              <button onClick={() => { setOpen(false); navigate("/signin"); }} className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Sign in
              </button>
              <button onClick={() => { setOpen(false); navigate("/signup"); }} className="mt-2 w-full px-4 py-2 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 text-white font-semibold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
