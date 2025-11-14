
// src/controllers/favoriteController.js
import Favorite from "../models/favModel.js";

/**
 * POST /api/favorites
 * Body: { gifId, gifUrl, title }
 * Protected route: req.user populated by protect middleware
 */
export const addFavorite = async (req, res) => {
  try {
    const user = req.user; // user object (no password)
    const { gifId, gifUrl, title } = req.body;

    if (!gifId || !gifUrl) {
      return res.status(400).json({ success: false, message: "gifId and gifUrl required" });
    }

    // upsert: if already present replace, otherwise insert
    const fav = await Favorite.findOneAndUpdate(
      { user: user._id, gifId },
      { user: user._id, gifId, gifUrl, title },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({ success: true, favorite: fav });
  } catch (err) {
    console.error("Add favorite error:", err);
    // Duplicate key error handling if race condition occurs
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Already favorited" });
    }
    return res.status(500).json({ success: false, message: "Failed to add favorite" });
  }
};

/**
 * GET /api/favorites
 * Protected: returns list of favorites for current user
 */
export const getFavorites = async (req, res) => {
  try {
    const favs = await Favorite.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, favorites: favs });
  } catch (err) {
    console.error("Get favs error:", err);
    res.status(500).json({ success: false, message: "Failed to get favorites" });
  }
};

/**
 * DELETE /api/favorites/:gifId
 * Protected: removes fav for current user and gifId
 */
export const removeFavorite = async (req, res) => {
  try {
    const { gifId } = req.params;
    await Favorite.findOneAndDelete({ user: req.user._id, gifId });
    res.json({ success: true, message: "Removed" });
  } catch (err) {
    console.error("Remove fav error:", err);
    res.status(500).json({ success: false, message: "Failed to remove" });
  }
};
