// src/features/favorites/FavoriteButton.jsx
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export default function FavoriteButton({ gif, initialFavorited = false }) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const [isFav, setIsFav] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  // Extract usable GIF URL
  const gifUrl =
    gif?.media?.[0]?.gif?.url ||
    gif?.images?.original?.url ||
    gif?.url ||
    gif?.mediaUrl ||
    "";

  const gifTitle =
    gif?.content_description ||
    gif?.title ||
    gif?.slug ||
    "GIF";

  // ---------------------- ADD FAVORITE ----------------------
  const addFavMut = useMutation({
    mutationFn: (payload) => api.post("/favorites", payload),

    onMutate: async () => {
      setLoading(true);
      setIsFav(true); // optimistic
    },

    onError: (err) => {
      console.error("Failed add favorite", err);
      setIsFav(false);
      alert(err?.response?.data?.message || "Error adding favorite");
    },

    onSettled: () => {
      setLoading(false);
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // ---------------------- REMOVE FAVORITE ----------------------
  const removeFavMut = useMutation({
    mutationFn: (gifId) => api.delete(`/favorites/${gifId}`),

    onMutate: async () => {
      setLoading(true);
      setIsFav(false); // optimistic
    },

    onError: (err) => {
      console.error("Failed remove favorite", err);
      setIsFav(true); // revert
    },

    onSettled: () => {
      setLoading(false);
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // Listen for "favorite added after login"
  useEffect(() => {
    const handler = (e) => {
      const fav = e?.detail;
      if (fav?.gifId === gif.id) setIsFav(true);
    };

    window.addEventListener("gifhub:favoriteAdded", handler);
    return () =>
      window.removeEventListener("gifhub:favoriteAdded", handler);
  }, [gif.id]);

  // ---------------------- HANDLE CLICK ----------------------
  const handleClick = async () => {
    if (!user) {
      // Save favorite for post-login
      localStorage.setItem(
        "gifhub_pending_fav",
        JSON.stringify({
          gifId: gif.id,
          gifUrl,
          title: gifTitle,
        })
      );

      return window.dispatchEvent(
        new CustomEvent("gifhub:showLogin")
      );
    }

    try {
      if (!isFav) {
        await addFavMut.mutateAsync({
          gifId: gif.id,
          gifUrl,
          title: gifTitle,
        });
      } else {
        await removeFavMut.mutateAsync(gif.id);
      }
    } catch {}
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm 
        bg-white/80 dark:bg-gray-800/80
        hover:scale-105 active:scale-95 transition
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      aria-pressed={isFav}
    >
      <svg
        className={`w-5 h-5 transition-all ${
          isFav ? "text-red-500 scale-110" : "text-gray-600 dark:text-gray-300"
        }`}
        viewBox="0 0 24 24"
        fill={isFav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21s-7-4.438-9-7.5C-1 8 4 3 7.5 5.5 10 7.3 12 9.2 12 9.2s2-1.9 4.5-3.7C20 3 25 8 21 13.5 19 16.562 12 21 12 21z" />
      </svg>

      <span>{isFav ? "Saved" : "Save"}</span>
    </button>
  );
}
