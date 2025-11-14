// src/routes/favoriteRoutes.js
import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all favorite routes
router.use(protect);

router.post("/", addFavorite);     // POST /api/favorites
router.get("/", getFavorites);     // GET /api/favorites
router.delete("/:gifId", removeFavorite); // DELETE /api/favorites/:gifId

export default router;
