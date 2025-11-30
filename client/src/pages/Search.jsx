// src/pages/Search.jsx
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import useDebounce from "../hooks/useDebounce";
import useAuth from "../hooks/useAuth";
import SearchInput from "../components/SearchInput";
import GifCard from "../components/GifCard";
import AuthAlert from "../components/AuthAlert";

/* ----------------------- Fetch Search Results ----------------------- */
const fetchSearch = async ({ queryKey }) => {
  const [_key, q, page, limit] = queryKey;
  if (!q) return { results: [] };

  const res = await api.get(
    `/gifs/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`
  );
  return res.data;
};

/* --------------------- Trending Keywords ---------------------------- */
const fetchTrendingKeywords = async () => {
  const res = await api.get("/search/trending");
  return res.data.trending || [];
};

/* ---------------------- User History ------------------------------- */
const fetchUserHistory = async () => {
  const res = await api.get("/search/history");
  return res.data.history || [];
};

export default function Search() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 450);

  const [page, setPage] = useState(1);
  const limit = 24;

  const [showAuthAlert, setShowAuthAlert] = useState(false);

  /* ----------------- Catch login-popup event ------------------ */
  useEffect(() => {
    const handler = () => setShowAuthAlert(true);
    window.addEventListener("gifhub:showLogin", handler);
    return () => window.removeEventListener("gifhub:showLogin", handler);
  }, []);

  /* ------------------ Search Results Query -------------------- */
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery({
    queryKey: ["search", debouncedQuery, page, limit],
    queryFn: fetchSearch,
    enabled: !!debouncedQuery,
    keepPreviousData: true,
  });

  /* ---------------- Trending Keywords Query ------------------- */
  const { data: trendingKeywords = [] } = useQuery({
    queryKey: ["trendingKeywords"],
    queryFn: fetchTrendingKeywords,
  });

  /* ---------------- User Search History Query ---------------- */
  const {
    data: userHistory = [],
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ["userHistory"],
    queryFn: fetchUserHistory,
    enabled: !!user,
  });

  /* ---------------- Save Search Keyword ---------------------- */
  const saveSearchMut = useMutation({
    mutationFn: (payload) => api.post("/search/add", payload),
    onSuccess: () => qc.invalidateQueries(["userHistory"]),
  });

  useEffect(() => setPage(1), [debouncedQuery]);

  const doSearch = (q) => setQuery(q);

  const handleSubmit = async () => {
    if (!query) return;
    try {
      if (user) {
        await saveSearchMut.mutateAsync({ keyword: query });
        refetchHistory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestionClick = (kw) => {
    doSearch(kw);
    if (user) saveSearchMut.mutate({ keyword: kw });
  };

  const results = searchData?.results || [];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-5xl">

      {/* AUTH POPUP */}
      {showAuthAlert && <AuthAlert onClose={() => setShowAuthAlert(false)} />}

      {/* PAGE HEADING */}
      <h1 className="text-center text-3xl font-semibold mb-6">
        Search GIFs
      </h1>

      {/* SEARCH INPUT CENTERED */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xl">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* ------------------ SUGGESTIONS SECTION ------------------ */}
      <div className="flex flex-col md:flex-row gap-10 justify-center mb-10">

        {/* Trending */}
        <div className="text-center">
          <h3 className="font-medium mb-3">Trending Keywords</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingKeywords.length === 0 ? (
              <div className="text-sm text-gray-500">No trending keywords</div>
            ) : (
              trendingKeywords.map((t) => (
                <button
                  key={t._id || t.keyword}
                  onClick={() => handleSuggestionClick(t.keyword)}
                  className="px-3 py-1 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {t.keyword}
                </button>
              ))
            )}
          </div>
        </div>

        {/* History */}
        <div className="text-center">
          <h3 className="font-medium mb-3">Your History</h3>
          {!user ? (
            <div className="text-sm text-gray-500">
              Login to save search history
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {userHistory.length === 0 ? (
                <div className="text-sm text-gray-500">No recent searches</div>
              ) : (
                userHistory.map((h) => (
                  <button
                    key={h._id}
                    onClick={() => handleSuggestionClick(h.keyword)}
                    className="px-3 py-1 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {h.keyword}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ------------------ RESULTS SECTION ------------------ */}
      <div className="text-center">
        {searchLoading && <div className="text-gray-500">Searching...</div>}
        {searchError && (
          <div className="text-red-500">Failed to search</div>
        )}
        {!debouncedQuery && (
          <div className="text-gray-500">
            Type a keyword to search GIFs or click a trending keyword.
          </div>
        )}
        {debouncedQuery && results.length === 0 && !searchLoading && (
          <div className="text-gray-500">
            No results found for <strong>"{debouncedQuery}"</strong>
          </div>
        )}
      </div>

      {/* GIF GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {results.map((gif) => (
          <GifCard key={gif.id || gif.uuid} gif={gif} />
        ))}
      </div>

      {/* Pagination */}
      {results.length > 0 && (
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border rounded"
            disabled={page === 1}
          >
            Prev
          </button>

          <div className="px-4 py-2 border rounded">Page {page}</div>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
         
        </div>
        
      )}
    
    </div>

    
  );
}
