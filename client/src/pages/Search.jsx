import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchGifs } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";

export default function Search() {
  const LIMIT = 12;
  const [q, setQ] = useState("");
  const debQ = useDebounce(q, 500);
  const [page, setPage] = useState(0);
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => { setPage(0); }, [debQ]);

  useEffect(() => {
    if (!debQ) { setGifs([]); setTotal(null); return; }
    const load = async () => {
      setLoading(true);
      try {
        const pos = page * LIMIT;
        const res = await searchGifs(debQ, LIMIT, pos);
        const data = res.data;
        const list = data.gifs || data.results || data || [];
        setGifs(list);
        if (data.total) setTotal(data.total);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    load();
  }, [debQ, page]);

  return (
    <div className="container-custom px-4 py-8">
      <div className="max-w-md mx-auto mb-6">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search GIFs..." className="w-full p-3 border rounded" />
      </div>

      {loading ? <Loader /> : gifs.length === 0 ? <div className="text-center">No results</div> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gifs.map(g => <GifCard key={g.id||g.gifId||g._id} gif={{ id: g.id||g.gifId||g._id, url: g.gifUrl||g.url, title: g.title }} />)}
          </div>

          <div className="flex items-center justify-between mt-8">
            <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0} className="px-4 py-2 rounded border">Prev</button>
            <div>Page {page+1} {total ? `• ${(page*LIMIT)+gifs.length} / ${total}` : ""}</div>
            <button onClick={()=>setPage(p=>p+1)} className="px-4 py-2 rounded border">Next</button>
          </div>
        </>
      )}
    </div>
  );
}
