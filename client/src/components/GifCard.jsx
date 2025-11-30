// src/components/GifCard.jsx
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShare, FiCopy } from "react-icons/fi";
import getGifUrl from "../utils/getGifUrl";
import useAuth from "../hooks/useAuth";
import AuthAlert from "./AuthAlert";

export default function GifCard({ gif }) {
  const gifUrl = getGifUrl(gif);
  const title = gif?.title || "GIF";
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(gif?.isFavorited || false);
  const [showAlert, setShowAlert] = useState(false);

  // ------------ FAVORITE ------------
  const handleFavorite = () => {
    if (!user) {
      setShowAlert(true);
      return;
    }

    setIsFav((prev) => !prev);

    window.dispatchEvent(
      new CustomEvent("gifhub:favoriteClicked", {
        detail: { gifId: gif.id, gifUrl, title },
      })
    );
  };

  // ------------ SHARE ------------
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "Check out this GIF!",
          url: gifUrl,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(gifUrl);
      alert("Link copied!");
    }
  };

  // ------------ COPY ------------
  const handleCopy = () => {
    navigator.clipboard.writeText(gifUrl);
    alert("GIF link copied!");
  };

  return (
    <>
      <div
        className="
          bg-white dark:bg-gray-900
          rounded-xl shadow-md hover:shadow-lg 
          transition-all p-3
          flex flex-col
        "
      >

        {/* GIF WRAPPER — FIXED HEIGHT, PERFECT VISIBILITY */}
        <div
          className="
            w-full 
            h-60                       /* FIXED CARD HEIGHT */
            bg-gray-100 dark:bg-gray-800 
            rounded-lg 
            flex items-center justify-center 
            overflow-hidden
          "
        >
          <img
            src={gifUrl}
            alt={title}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-200 line-clamp-1">
          {title}
        </p>

        {/* Buttons */}
        <div className="mt-3 flex items-center justify-between">

          {/* Heart */}
          <button
            onClick={handleFavorite}
            className="
              w-10 h-10 flex items-center justify-center rounded-full
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700 transition
            "
          >
            {isFav ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="
              w-10 h-10 flex items-center justify-center rounded-full
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700 transition
            "
          >
            <FiShare className="text-gray-700 dark:text-gray-300 text-xl" />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="
              w-10 h-10 flex items-center justify-center rounded-full
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700 transition
            "
          >
            <FiCopy className="text-gray-700 dark:text-gray-300 text-xl" />
          </button>
        </div>
      </div>

      {/* Auth Alert Popup */}
      <AuthAlert
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onLogin={() => {
          setShowAlert(false);
          window.dispatchEvent(new CustomEvent("gifhub:showLogin"));
        }}
      />
    </>
  );
}
