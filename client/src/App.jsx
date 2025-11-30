import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";        // ✅ ADD FOOTER
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Trending from "./pages/Trending";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FavoritesPage from "./features/favorites/FavoritesPage";

import { Toaster } from "react-hot-toast";       // ✅ ADD TOASTER
import { useTheme } from "./context/ThemeContext"; // ✅ GET CURRENT THEME

export default function App() {
  const { theme } = useTheme();   // "light" | "dark"

  return (
    <div className={theme}>        {/* ✅ APPLY THEME TO WHOLE APP */}
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-center" /> {/* ✅ GLOBAL TOASTER */}
      </BrowserRouter>
    </div>
  );
}
