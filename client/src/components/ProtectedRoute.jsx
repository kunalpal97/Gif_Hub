import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    alert("You must login to access this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
