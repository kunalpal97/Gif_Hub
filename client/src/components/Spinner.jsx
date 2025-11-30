// src/components/Spinner.jsx
import React from "react";

export default function Spinner({ size = "lg" }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-10 w-10 border-4",
    xl: "h-14 w-14 border-4",
  };

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div
        className={`
          animate-spin rounded-full border-gray-300 
          border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400
          ${sizes[size]}
        `}
      />
    </div>
  );
}
