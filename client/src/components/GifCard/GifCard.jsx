import React, { useContext, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaRegCopy,
} from "react-icons/fa";
import { addFavorite, removeFavorite } from "../../api/gifService";
import { AuthContext } from "../../context/AuthContext";
import ModalLoginPrompt from "../ModalLoginPrompt";
import toast from "react-hot-toast";

export default function GifCard({
  gif,
  initiallyFav = false,
  onFavChange,
}) {
  const { user } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(Boolean(initiallyFav));
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const safeToggleFav = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setLoading(true);
    try {
      if (!isFav) {
        await addFavorite({
          gifId: gif.id,
          gifUrl: gif.url,
          title: gif.title || "",
        });
        setIsFav(true);
        toast.success("Added to favorites");
        onFavChange && onFavChange(true);
      } else {
        await removeFavorite(gif.id);
        setIsFav(false);
        toast("Removed from favorites");
        onFavChange && onFavChange(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Favorite action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gif.title || "GifHub",
          url: gif.url,
        });
      } catch {
        toast.dismiss(); 
      }
    } else {
      try {
        await navigator.clipboard.writeText(gif.url);
        toast.success("Link copied");
      } catch {
        toast.error("Copy failed");
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gif.url);
      toast.success("Link copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <>
      <div
        className="
          rounded-2xl 
          overflow-hidden 
          bg-white dark:bg-slate-800 
          shadow-md hover:shadow-xl 
          hover:-translate-y-1 
          transition-all duration-200 
          border border-slate-200 dark:border-slate-700
        "
      >
        {/* GIF container */}
        <div className="bg-slate-100 dark:bg-slate-900 flex items-center justify-center h-64 sm:h-60 md:h-56">
          <img
            src={gif.url}
            alt={gif.title || "gif"}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Bottom bar */}
        <div className="p-3 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[70%]">
            {gif.title || gif.content_description || "GifHub"}
          </div>

          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <button
              aria-label="favorite"
              onClick={safeToggleFav}
              disabled={loading}
              className="hover:text-red-500 transition"
            >
              {isFav ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <button
              aria-label="share"
              onClick={handleShare}
              className="hover:text-blue-500 transition"
            >
              <FaShareAlt />
            </button>

            <button
              aria-label="copy"
              onClick={handleCopy}
              className="hover:text-green-500 transition"
            >
              <FaRegCopy />
            </button>
          </div>
        </div>
      </div>

      <ModalLoginPrompt
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
