import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthAlert({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      
      <div className="bg-white dark:bg-gray-900 p-7 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-200/30 dark:border-gray-700/50 animate-scaleIn">

        {/* Icon */}
        <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 
          bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 
          rounded-full text-3xl">
          🔒
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
          Login Required
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          You need to be logged in to save your favourite GIFs.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3">
          
          {/* Cancel */}
          <button
            className="px-4 py-2 rounded-lg 
              bg-gray-200 dark:bg-gray-700 
              text-gray-800 dark:text-gray-200
              hover:bg-gray-300 dark:hover:bg-gray-600
              transition-all"
            onClick={onClose}
          >
            Cancel
          </button>

          {/* Login */}
          <button
            className="px-4 py-2 rounded-lg 
              bg-blue-600 text-white 
              hover:bg-blue-700 
              transition-all shadow-md"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}
