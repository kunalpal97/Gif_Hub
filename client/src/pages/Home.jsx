import React, { useEffect, useState } from "react";
import { searchGifs } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home(){
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const LIMIT = 12;

  const doSearch = async (q, p = 0) => {
    if (!q) { setGifs([]); return; }
    setLoading(true);
    try {
      const res = await searchGifs(q, LIMIT, p * LIMIT);
      const data = res?.data || res;
      // data may be { success: true, data: { results: [...] } } like Tenor OR array
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (data.data?.results) list = data.data.results;
      else if (Array.isArray(data.data)) list = data.data;
      else if (Array.isArray(data.results)) list = data.results;
      // normalize to { id, url, title }
      const normalize = list.map(it => ({
        id: it.id || it._id,
        url: it.media_formats?.tinygif?.url || it.url || (it.images?.original?.url),
        title: it.title || it.content_description || ""
      })).filter(s => s.url);
      setGifs(normalize);
      if (!normalize.length) toast("No results found", { icon: "🔎" });
    } catch (err) {
      console.error(err);
      toast.error("Search failed");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    // optionally fetch default gifs for home (e.g., 'funny')
    doSearch("funny", 0);
  }, []);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="container-custom mx-auto text-center">
        <h1 className="text-4xl font-bold text-cyan-300 mb-4">Find GIFs</h1>

        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)}
                   onKeyDown={e => { if(e.key==='Enter') { doSearch(query); setPage(0); } }}
                   placeholder="Search gifs e.g. cats, cricket, reaction..."
                   className="w-full p-3 rounded-l-lg bg-slate-800 border border-slate-700 text-white" />
            <button onClick={() => { setPage(0); doSearch(query, 0); }}
                    className="px-4 bg-cyan-400 text-slate-900 rounded-r-lg font-semibold">Search</button>
          </div>
        </div>

        {loading ? <Loader /> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {gifs.map(g => <GifCard key={g.id||g.url} gif={g} />)}
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => { setPage(p => Math.max(0, p-1)); doSearch(query, Math.max(0, page-1)); }}
                      className="px-4 py-2 bg-slate-700 rounded disabled:opacity-40">Prev</button>
              <div className="text-slate-300">Page {page+1}</div>
              <button onClick={() => { setPage(p => p+1); doSearch(query, page+1); }}
                      className="px-4 py-2 bg-slate-700 rounded">Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
