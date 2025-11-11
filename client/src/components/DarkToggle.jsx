import React, { useEffect, useState } from "react";

export default function DarkToggle() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((s) => !s)}
      className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
