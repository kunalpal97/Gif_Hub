import React from "react";
import { Link } from "react-router-dom";

export default function ModalLoginPrompt({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Login required</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          You need to login to add gifs to your favorites. Login or signup to continue.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <Link to="/login" className="px-3 py-1 rounded bg-cyan-400">Login</Link>
        </div>
      </div>
    </div>
  );
}
