// src/pages/Trending.jsx
import React, { useEffect, useState } from "react";
import { fetchTrending } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";

export default function Trending() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const LIMIT = 25;

  const normalizeList = (list = []) =>
    list
      .map((it) => ({
        id: it.id || it._id || it.gifId || (it.url || it.media_formats?.tinygif?.url),
        url: it.media_formats?.tinygif?.url || it.url || it.images?.original?.url,
        title: it.title || it.content_description || "",
      }))
      .filter((i) => i.url);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchTrending(LIMIT, 0);
        const data = res?.data || res;
        const list = data?.data?.results || data.results || data?.data || data;
        const normalized = normalizeList(Array.isArray(list) ? list : []);
        setGifs(normalized);
      } catch (err) {
        console.error("trending error", err);
        setGifs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="container-custom mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-cyan-300 mb-6">🔥 Trending GIFs</h2>

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gifs.map((g) => <GifCard key={g.id || g.url} gif={g} />)}
          </div>
        )}
      </div>
    </main>
  );
}
