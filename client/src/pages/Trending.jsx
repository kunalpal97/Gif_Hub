import React from "react";
import Home from "./Home"; // not used but structure kept if needed
import { fetchTrending } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";

export default function Trending(){
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchTrending(24, 0);
      const backend = res?.data || res;
      const list = backend?.data?.results || backend.results || backend.data || backend;
      const normalized = (Array.isArray(list) ? list : []).map(it => ({
        id: it.id,
        url: it.media_formats?.tinygif?.url || it.url || (it.images?.original?.url),
        title: it.title || it.content_description || ""
      })).filter(Boolean);
      setGifs(normalized);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="container-custom mx-auto">
        <h2 className="text-3xl text-center font-bold text-cyan-300 mb-6">🔥 Trending GIFs</h2>
        {loading ? <Loader /> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {gifs.map(g => <GifCard key={g.id||g.url} gif={g} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
