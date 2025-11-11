import React, { useEffect, useState } from "react";
import { fetchTrending } from "../api/gifService";
import GifCard from "../components/GifCard/GifCard";
import Loader from "../components/Loader";

export default function Home() {
  const LIMIT = 12;
  const [page, setPage] = useState(0);
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);

  const load = async (p = 0) => {
    setLoading(true);
    setError(null);
    try {
      const pos = p * LIMIT;
      const res = await fetchTrending(LIMIT, pos);
      const data = res.data;
      // adapt depending on backend shape:
      // expect { success: true, gifs: [...], total: number }
      const list = data.gifs || data.results || data || [];
      setGifs(list);
      if (data.total) setTotal(data.total);
    } catch (err) {
      console.error(err);
      setError("Failed to load trending gifs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); }, [page]);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => {
    if (total && (page + 1) * LIMIT >= total) return;
    setPage((p) => p + 1);
  };

  return (
    <div className="container-custom px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Trending GIFs</h2>

      {loading ? <Loader /> : error ? <div className="text-red-500 text-center">{error}</div> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gifs.map((g) => (
              <GifCard key={g.id || g.gifId || g._id} gif={{ id: g.id || g.gifId || g._id, url: g.gifUrl || g.url, title: g.title }} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-8">
            <button onClick={prev} disabled={page === 0} className="px-4 py-2 rounded border disabled:opacity-50">
              Prev
            </button>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              Page {page + 1} {total ? `• Showing ${(page*LIMIT)+gifs.length} of ${total}` : ""}
            </div>

            <button onClick={next} className="px-4 py-2 rounded border disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
