import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react"; 

export default function Homeheader() {
  const [open, setOpen] = useState(false);

  const NavItem = ({ to, children }) => (
    <button
      to={to}
      end
      className={({ isActive }) =>
        `text-sm font-medium px-3 py-2 rounded-md transition-colors ${
          isActive
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-3">
                <button to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-linear-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white text-lg font-bold">K</div>
                <div>
                    <div className="text-lg font-extrabold text-gray-900">KaamSetu</div>
                    <div className="text-xs text-gray-500 -mt-0.5">Rural Labor Exchange</div>
                </div>
                </button>
            </div>

            <nav className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-5">
                <NavItem to="/about">About</NavItem>
                <NavItem to="/how">How it works</NavItem>
                </div>

                <div className="ml-4 flex items-center gap-2">
                <button
                    to="/login"
                    className="text-sm px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                    Login
                </button>

                <button
                    to="/signup"
                    className="text-sm px-3 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm"
                >
                    Sign up
                </button>
                </div>
            </nav>

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

            <div
            className={`fixed top-16 right-0 max-h-1/2 w-1/3 bg-white shadow-2xl  transform transition-transform duration-300 ease-in-out z-50
            ${open ? "translate-x-0" : "translate-x-full"}`}
            >
            <div onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-grey-500 bg-opacity-30 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            ></div>

                <div className="p-8  space-y-3">
                <NavItem to="/about" onClick={() => setOpen(false)}>
                    About
                </NavItem>
                <NavItem to="/how" onClick={() => setOpen(false)}>
                    How it works
                </NavItem>

                <div className="pt-4 border-t mt-4 flex flex-col gap-3">
                    <button
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full text-sm px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 text-left"
                    >
                    Login
                    </button>

                    <button
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="w-full text-sm px-3 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-500 text-center"
                    >
                    Sign up
                    </button>
                </div>
                </div>
            
            </div>

    </header>
  );
}
