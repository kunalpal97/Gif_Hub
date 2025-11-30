// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("gifhub_user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const onUnauthorized = () => {
      logout();
      window.dispatchEvent(new CustomEvent("gifhub:showLogin"));
    };
    window.addEventListener("gifhub:unauthorized", onUnauthorized);
    return () => window.removeEventListener("gifhub:unauthorized", onUnauthorized);
  }, []);

  // Process any pending favorite queue (one item)
  const processPendingFavorite = async (token) => {
    try {
      const pendingRaw = localStorage.getItem("gifhub_pending_fav");
      if (!pendingRaw) return;
      const pending = JSON.parse(pendingRaw);
      if (!pending || !pending.gifId) return;

      // Ensure token is set in localStorage already (login saved it)
      const res = await api.post("/favorites", {
        gifId: pending.gifId,
        gifUrl: pending.gifUrl,
        title: pending.title,
      });
      // remove pending
      localStorage.removeItem("gifhub_pending_fav");
      // optionally notify UI
      window.dispatchEvent(new CustomEvent("gifhub:favoriteAdded", { detail: res.data.favorite }));
    } catch (err) {
      console.error("Failed processing pending fav:", err);
    }
  };

  const saveSession = async (userObj, token) => {
    localStorage.setItem("gifhub_token", token);
    localStorage.setItem("gifhub_user", JSON.stringify(userObj));
    setUser(userObj);
    // Process pending fav after login
    await processPendingFavorite(token);
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/users/login", { email, password });
    await saveSession(res.data.user, res.data.token);
    return res.data;
  };

  const signup = async (payload) => {
    const res = await api.post("/users/signup", payload);
    await saveSession(res.data.user, res.data.token);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("gifhub_token");
    localStorage.removeItem("gifhub_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
