import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const ctx = useContext(AuthContext);
  // if ctx undefined -> not wrapped correctly
  if (!ctx) return <Navigate to="/login" replace />;
  if (!ctx.user) return <Navigate to="/login" replace />;
  return children;
}
