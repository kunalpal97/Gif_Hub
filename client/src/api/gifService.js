// src/api/gifService.js
import api from "./axiosInstance";

export const fetchTrending = (limit = 12, pos = 0) => {
  console.log("[gifService] calling /api/gifs/trending", { limit, pos });
  return api.get(`/gifs/trending?limit=${limit}&pos=${pos}`);
};

export const searchGifs = (q, limit = 12, pos = 0) => {
  console.log("[gifService] search", { q, limit, pos });
  return api.get(`/gifs/search?q=${encodeURIComponent(q)}&limit=${limit}&pos=${pos}`);
};

export const addFavorite = (payload) => api.post("/favorites", payload);
export const getFavorites = () => api.get("/favorites");
export const removeFavorite = (gifId) => api.delete(`/favorites/${gifId}`);
