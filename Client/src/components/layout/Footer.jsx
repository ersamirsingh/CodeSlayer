import React from 'react'
import {  Phone } from 'lucide-react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="text-sm">© {new Date().getFullYear()} KaamSetu</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm hover:text-indigo-600">Privacy</Link>
            <Link to="/terms" className="text-sm hover:text-indigo-600">Terms</Link>
            <div className="flex items-center text-sm gap-2">
              <Phone className="w-4 h-4" /> <span>Help: 9245543678</span>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
