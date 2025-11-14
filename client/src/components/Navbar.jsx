// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import DarkToggle from "./DarkToggle";

/**
 * Navbar
 * - Responsive (desktop menu + mobile slide-down)
 * - Closes mobile menu on link click or when route changes
 * - Uses icons for clear affordance
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close the menu when route changes (so it doesn't stay open after navigation)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close when clicking outside the mobile menu (optional nice UX)
  useEffect(() => {
    function onDoc(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-tighter">
          GIF_HUB
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm hover:text-cyan-400 transition">Home</Link>
          <Link to="/trending" className="text-sm hover:text-cyan-400 transition">Trending</Link>
          <Link to="/favorites" className="text-sm hover:text-cyan-400 transition">Favorites</Link>

          <DarkToggle />

          <div className="flex gap-2 items-center">
            <Link to="/login" className="px-3 py-1 border rounded text-sm">Login</Link>
            <Link to="/signup" className="px-3 py-1 rounded bg-cyan-500 text-sm text-slate-900">Signup</Link>
          </div>
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu (slide down) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden bg-slate-800 border-t border-slate-700 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-700">Home</Link>
          <Link to="/trending" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-700">Trending</Link>
          <Link to="/favorites" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-700">Favorites</Link>

          <div className="pt-2 border-t border-slate-700"></div>

          <div className="py-2 px-3 bg-cyan-500 rounded text-center text-slate-900 w-full max-w-[200px] mx-left">
            <DarkToggle />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Link 
              to="/login" 
              onClick={() => setOpen(false)}
              className="py-2 px-3 border rounded text-center w-full max-w-[200px] mx-left"
            >
              Login
            </Link>

            <Link 
              to="/signup" 
              onClick={() => setOpen(false)}
              className="py-2 px-3 bg-cyan-500 rounded text-center text-slate-900 w-full max-w-[200px] mx-left"
            >
              Signup
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
