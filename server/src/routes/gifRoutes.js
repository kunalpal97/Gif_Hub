// routes/gifRoutes.js
import express from "express";
import { getTrendingGifs, searchGifs } from "../controllers/gifController.js";

const router = express.Router();

// GET /api/gifs/trending?page=1&limit=30
router.get("/trending", getTrendingGifs);

// GET /api/gifs/search?q=funny&page=1&limit=30
router.get("/search", searchGifs);

export default router;
