// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000
});

// attach token from localStorage (or from in-memory store via a setter)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gifhub_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// response interceptor: handle 401 globally (open login modal via event)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // dispatch a custom event so UI can respond (AuthContext will listen)
      window.dispatchEvent(new CustomEvent("gifhub:unauthorized"));
    }
    return Promise.reject(err);
  }
);

export default api;
