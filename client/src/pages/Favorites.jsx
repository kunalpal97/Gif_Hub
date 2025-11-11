import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFavorites, removeFavorite } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      nav("/login", { replace: true });
      return;
    }
    const load = async () => {
      setLoading(true);
      try {
        const res = await getFavorites();
        const data = res.data;
        setFavs(data.favorites || data || []);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    load();
  }, [user]);

  const handleRemove = async (gifId) => {
    const prev = favs;
    setFavs((s) => s.filter(f => (f.gifId || f.id) !== gifId));
    try { await removeFavorite(gifId); } catch (err) { setFavs(prev); alert("Remove failed"); }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-custom px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Favorites</h2>
      {favs.length === 0 ? <div className="text-center">No favorites yet — add some!</div> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favs.map(f => {
              const id = f.gifId || f.id || f._id;
              return <GifCard key={id} gif={{ id, url: f.gifUrl || f.url, title: f.title }} initiallyFav={true} onFavChange={() => handleRemove(id)} />
            })}
          </div>
          {/* pagination for favorites if backend supports total / limit */}
        </>
      )}
    </div>
  );
}
