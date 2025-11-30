// src/components/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFire, FaHeart, FaSearch, FaHome } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import { ThemeToggle } from "../context/ThemeContext";
import logo from "../assets/gif.png";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🔥 NAV ITEMS WITH HOVER UNDERLINE
  const navItems = [
    { label: "Home", icon: <FaHome size={15} />, path: "/" },
    { label: "Trending", icon: <FaFire size={15} />, path: "/trending" },
    { label: "Search", icon: <FaSearch size={15} />, path: "/search" },
  ];

  // ❤️ Favorites special rule (if user not logged in → AuthAlert)
  const handleFavoritesClick = (e) => {
    if (!user) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("gifhub:showLogin"));
      return;
    }
    navigate("/favorites");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 object-contain transition-transform hover:scale-110"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 relative"
            >
              {item.icon}
              {item.label}

              {/* Underline Animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* FAVORITES (special rule + underline) */}
          <button
            onClick={handleFavoritesClick}
            className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 relative"
          >
            <FaHeart size={15} /> Favorites
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* RIGHT SIDE (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />

          {user ? (
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-gray-900 text-white dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 transition"
            >
              {user?.name || "Profile"}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-gray-800 dark:text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-5 space-y-5">

          <ThemeToggle />

          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block text-lg"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Favorites */}
          <button
            onClick={(e) => {
              setOpen(false);
              handleFavoritesClick(e);
            }}
            className="block text-left text-lg w-full"
          >
            Favorites
          </button>

          {!user && (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-xl"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-xl"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
