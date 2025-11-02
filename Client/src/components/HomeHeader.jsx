/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Homeheader() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/how", label: "How it works" },
  ];

  const MobilePanel = () => (
    <AnimatePresence>
      {open && (
        <>
          {/* overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            aria-hidden
          />

          {/* sliding panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-2xl border-l"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-linear-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-bold">
                    K
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-gray-900">KaamSetu</div>
                    <div className="text-xs text-gray-500 -mt-0.5">Rural Labor Exchange</div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "text-indigo-700 bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-6 border-t mt-6 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border hover:bg-gray-50"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* brand */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-linear-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white text-lg font-bold">
                K
              </div>
              <div>
                <div className="text-lg font-extrabold text-gray-900">KaamSetu</div>
                <div className="text-xs text-gray-500 -mt-0.5">Rural Labor Exchange</div>
              </div>
            </NavLink>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            <div className="ml-4 flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-sm px-3 py-2 rounded-md font-medium bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow hover:brightness-95 transition"
              >
                Sign up
              </Link>
            </div>
          </nav>

          {/* mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel (AnimatePresence handles mount/unmount) */}
      <MobilePanel />
    </header>
  );
}
