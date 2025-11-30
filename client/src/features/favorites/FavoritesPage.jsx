import React, { useEffect, useState } from "react";
import GifCard from "../../components/GifCard";
import useAuth from "../../hooks/useAuth";     // ✅ Get logged-in user
import AuthAlert from "../../components/AuthAlert";  // ✅ Import AuthAlert

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();  // ✅ Check logged-in user

  // Load saved favorites
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gifhub:favorites") || "[]");
    setFavorites(stored);
  }, []);

  // Listen to favorite events
  useEffect(() => {
    const handler = (e) => {
      const { gifId, gifUrl, title } = e.detail;

      setFavorites((prev) => {
        const exists = prev.some((gif) => gif.id === gifId);

        let updated;
        if (exists) {
          updated = prev.filter((gif) => gif.id !== gifId);
        } else {
          updated = [
            ...prev,
            { id: gifId, images: { original: { url: gifUrl } }, title },
          ];
        }

        localStorage.setItem("gifhub:favorites", JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener("gifhub:favoriteClicked", handler);
    return () => window.removeEventListener("gifhub:favoriteClicked", handler);
  }, []);

  // 🚫 NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthAlert />
      </div>
    );
  }

  // ✅ LOGGED IN → Show Favorites
  return (
    <div className="min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((gif) => (
            <GifCard key={gif.id} gif={gif} />
          ))}
        </div>
      )}
    </div>
  );
}
