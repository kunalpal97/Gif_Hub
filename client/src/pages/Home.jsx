// src/pages/Home.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import GifCard from "../components/GifCard";
import Footer from "../components/Footer";

// fetcher (React Query v5)
const fetchTrending = async ({ queryKey }) => {
  const [_key, page, limit] = queryKey;
  const res = await api.get(`/gifs/trending?page=${page}&limit=${limit}`);
  return res.data;
};

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 24;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending", page, limit],
    queryFn: fetchTrending,
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });

  const results = data?.results || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Home GIFs 🔥
      </h2>

      {/* Loading / Error */}
      {isLoading && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load GIFs</p>
      )}

      {/* GIF Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
        place-items-center
      ">
        {results.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setPage((p) => p + 1)}
          className="
            px-6 py-2.5 
            rounded-lg 
            bg-blue-600 
            text-white 
            hover:bg-blue-700 
            transition shadow-md
          "
        >
          Load More
        </button>
      </div>
      <Footer/>
    </div>
  );
}
