import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full border-cyan-400"></div>
    </div>
  );
}
