import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ─── ABOUT ───────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            GIFHub
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Discover, share and save your favorite GIFs with ease.  
            Enjoy fast search and smooth UI powered by modern tech.
          </p>
        </div>

        {/* ─── LINKS ───────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Quick Links
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="/trending"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
              >
                Trending
              </a>
            </li>
            <li>
              <a
                href="/search"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
              >
                Search GIFs
              </a>
            </li>
            <li>
              <a
                href="/favorites"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
              >
                Favorites
              </a>
            </li>
          </ul>
        </div>

        {/* ─── SOCIALS ───────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Connect With Us
          </h2>
          <div className="flex items-center gap-4 mt-3">
            <a
              href="https://github.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaGithub className="text-xl text-gray-700 dark:text-gray-300" />
            </a>

            <a
              href="https://instagram.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaInstagram className="text-xl text-pink-500" />
            </a>

            <a
              href="https://twitter.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaTwitter className="text-xl text-sky-500" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── COPYRIGHT ───────────────────────────────────── */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-500 mt-8">
        © {new Date().getFullYear()} GIFHub. All rights reserved.
      </div>
    </footer>
  );
}
