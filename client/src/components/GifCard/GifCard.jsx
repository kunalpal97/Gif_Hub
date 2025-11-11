import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt, FaRegCopy } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../../api/gifService";
import { AuthContext } from "../../context/AuthContext";
import ModalLoginPrompt from "../ModalLoginPrompt";

export default function GifCard({ gif, initiallyFav = false, onFavChange }) {
  const { user } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(Boolean(initiallyFav));
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleToggleFav = async () => {
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
        onFavChange && onFavChange(true);
      } else {
        await removeFavorite(gif.id);
        setIsFav(false);
        onFavChange && onFavChange(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = { title: gif.title || "GifHub", text: gif.title || "", url: gif.url };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(gif.url);
        alert("Link copied to clipboard");
      } catch {
        alert("Copy failed");
      }
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(gif.url);
      alert("Link copied");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="relative">
          <img src={gif.url} alt={gif.title || "gif"} loading="lazy" className="w-full h-48 object-cover" />
        </div>
        <div className="p-3 flex items-center justify-between">
          <div className="text-sm truncate max-w-[65%]">{gif.title || "GifHub"}</div>
          <div className="flex items-center gap-3">
            <button aria-label="fav" onClick={handleToggleFav} disabled={loading}>
              {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <button aria-label="share" onClick={handleShare}><FaShareAlt /></button>
            <button aria-label="copy" onClick={copy}><FaRegCopy /></button>
          </div>
        </div>
      </div>

      <ModalLoginPrompt open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
