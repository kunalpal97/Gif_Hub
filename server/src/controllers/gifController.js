// src/controllers/gifController.js
import { fetchTrendingGifs, searchGifs } from "../utils/tenorApi.js";

export const fetchTrending = async (req, res) => {
  try {
    const data = await fetchTrendingGifs();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to fetch trending GIFs",
      error: error.message,
    });
  }
};

export const fetchBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query missing",
      });
    }

    const data = await searchGifs(q); // ✅ function available now
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Search GIFs",
      error: error.message,
    });
  }
};
