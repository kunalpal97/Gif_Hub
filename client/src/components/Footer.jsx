import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-700">
      <div className="container-custom px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} GIF_HUB. All rights reserved.
      </div>
    </footer>
  );
}
