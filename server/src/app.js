
// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
connectDB();

import userRoutes from "./routes/userRoutes.js";
import gifRoutes from "./routes/gifRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

// parse JSON bodies
app.use(express.json());

// CORS - allow frontend origin (set in .env)
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));

// basic health
app.get("/", (req, res) => res.send("🎉 GIF Hub backend running"));

// mount routes
app.use("/api/users", userRoutes);
app.use("/api/gifs", gifRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/categories", categoryRoutes);

// global error fallback (optional)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Server error" });
});

export default app;
