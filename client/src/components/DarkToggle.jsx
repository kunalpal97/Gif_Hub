// src/components/DarkToggle.jsx
import { useEffect, useState } from "react";

/**
 * DarkToggle
 * - Stores preference in localStorage ("dark" or "light")
 * - Applies/removes "dark" class on <html>
 * - Button text shows the mode you will switch to, e.g. "Dark" when currently light.
 */
export default function DarkToggle() {
  const getInitial = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // fallback to system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Button shows the mode we'll switch to on click:
  // if isDark === true, clicking will switch to light -> show "Light"
  // if isDark === false, clicking will switch to dark -> show "Dark"
  return (
    <button
      onClick={() => setIsDark((s) => !s)}
      className="px-3 py-1 text-sm rounded border border-slate-700 bg-slate-800 text-white hover:opacity-90"
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
