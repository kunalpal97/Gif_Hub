// src/components/SearchInput.jsx
import React from "react";

export default function SearchInput({ value, onChange, onSubmit, placeholder = "Search GIFs..." }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full flex items-center gap-2"
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        aria-label="Search GIFs"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
      >
        Search
      </button>
    </form>
  );
}
