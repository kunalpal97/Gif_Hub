// src/pages/Trending.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import GifCard from "../components/GifCard";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

export default function Trending() {
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["trending-gifs"],
    queryFn: async () => {
      const res = await api.get("/gifs/trending?page=1&limit=30");
      return res.data.results;
    },
  });

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <div className="text-center mt-20 text-red-400">
        Failed to load trending GIFs
        <button
          onClick={refetch}
          className="ml-3 px-4 py-1 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header (Same as Home.jsx) */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Trending GIFs 🔥
      </h2>

      {/* GIF Grid (Same spacing + centering style as Home.jsx) */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
          place-items-center
        "
      >
        {data?.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}
