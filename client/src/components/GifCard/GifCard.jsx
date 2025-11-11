import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt, FaRegCopy } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../../api/gifService";
import { AuthContext } from "../../context/AuthContext";
import ModalLoginPrompt from "../ModalLoginPrompt";
import toast from "react-hot-toast";

export default function GifCard({ gif, initiallyFav = false, onFavChange }) {
  const { user } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(Boolean(initiallyFav));
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleToggleFav = async () => {
    if (!user) { setShowLoginModal(true); return; }
    setLoading(true);
    try {
      if (!isFav) {
        await addFavorite({ gifId: gif.id, gifUrl: gif.url, title: gif.title || "" });
        setIsFav(true);
        onFavChange && onFavChange(true);
        toast.success("Added to favorites");
      } else {
        await removeFavorite(gif.id);
        setIsFav(false);
        onFavChange && onFavChange(false);
        toast("Removed from favorites");
      }
    } catch (err) {
      console.error(err);
      toast.error("Favorite action failed");
    } finally { setLoading(false); }
  };

  const handleShare = async () => {
    const shareData = { title: gif.title || "GifHub", text: gif.title || "", url: gif.url };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { toast.error("Share cancelled"); }
    } else {
      try { await navigator.clipboard.writeText(gif.url); toast.success("GIF link copied"); } catch { toast.error("Copy failed"); }
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(gif.url); toast.success("Link copied"); } catch { toast.error("Copy failed"); }
  };

  return (
    <>
      <div className="card-bg rounded-xl overflow-hidden shadow-sm flex flex-col">
        {/* Image wrapper uses object-contain so full gif visible */}
        <div className="bg-[#0b1220] flex items-center justify-center h-52">
          <img
            src={gif.url}
            alt={gif.title || "gif"}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="p-3 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-200 truncate max-w-[65%]">
            {gif.title || gif.content_description || "GifHub"}
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <button aria-label="fav" onClick={handleToggleFav} disabled={loading}
                    className="hover:text-white">
              {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>

            <button aria-label="share" onClick={handleShare} className="hover:text-white">
              <FaShareAlt />
            </button>

            <button aria-label="copy" onClick={copy} className="hover:text-white">
              <FaRegCopy />
            </button>
          </div>
        </div>
      </div>

      <ModalLoginPrompt open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
