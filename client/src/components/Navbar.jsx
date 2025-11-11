// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkToggle from "./DarkToggle";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="container-custom px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">GIF_HUB</Link>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/trending" className="hover:underline">Trending</Link>
            <Link to="/favorites" className="hover:underline">Favorites</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DarkToggle />
          {!user ? (
            <>
              <button onClick={() => nav("/login")} className="px-3 py-1 border border-slate-700 rounded">Login</button>
              <button onClick={() => nav("/signup")} className="px-3 py-1 rounded bg-cyan-400 text-slate-900 font-semibold">Signup</button>
            </>
          ) : (
            <>
              <div className="text-sm">{user.name}</div>
              <button onClick={logout} className="px-3 py-1 border border-slate-700 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
