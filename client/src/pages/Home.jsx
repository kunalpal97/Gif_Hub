// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { searchGifs } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const LIMIT = 25;

  const normalizeList = (list = []) =>
    list
      .map((it) => ({
        id: it.id || it._id || it.gifId || (it.url || it.media_formats?.tinygif?.url),
        url: it.media_formats?.tinygif?.url || it.url || it.images?.original?.url,
        title: it.title || it.content_description || "",
        raw: it,
      }))
      .filter((i) => i.url);

  const doSearch = async (q, p = 0) => {
    if (!q) {
      setGifs([]);
      return;
    }
    setLoading(true);
    try {
      const res = await searchGifs(q, LIMIT, p * LIMIT);
      const data = res?.data || res;
      const list = data?.data?.results || data.results || data?.data || data;
      const normalized = normalizeList(Array.isArray(list) ? list : []);
      setGifs(normalized);
      if (!normalized.length) toast("No results found");
    } catch (err) {
      console.error("search error", err);
      toast.error("Search failed");
      setGifs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // default home content
    setQuery("funny");
    doSearch("funny", 0);
    // eslint-disable-next-line
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="container-custom mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-cyan-300 mb-6">Find GIFs</h1>

        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { setPage(0); doSearch(query, 0); } }}
              placeholder="Search gifs e.g. cats, cricket, reaction..."
              className="flex-1 p-3 rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
            <button
              onClick={() => { setPage(0); doSearch(query, 0); }}
              className="px-5 py-3 bg-cyan-400 text-slate-900 rounded-r-lg font-semibold"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gifs.map((g) => <GifCard key={g.id || g.url} gif={g} />)}
            </div>

            {/* fixed bottom center pagination */}
            <div className="fixed left-0 right-0 bottom-6 flex items-center justify-center pointer-events-none">
              <div className="pointer-events-auto bg-white dark:bg-slate-800/60 px-4 py-2 rounded-full shadow flex items-center gap-3">
                <button
                  onClick={() => { const np = Math.max(0, page - 1); setPage(np); doSearch(query, np); }}
                  disabled={page === 0}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Prev
                </button>

                <div className="text-sm text-slate-800 dark:text-slate-200">Page {page + 1}</div>

                <button
                  onClick={() => { const np = page + 1; setPage(np); doSearch(query, np); }}
                  className="px-3 py-1 border rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
