// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-700">
      <div className="container-custom px-6 py-6 text-center">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          © {new Date().getFullYear()} GIF_HUB — Built with ❤️ · Designed responsively
        </div>
      </div>
    </footer>
  );
}
