
// controllers/gifController.js
import axios from "axios";

export const getTrendingGifs = async (req, res) => {
  try {
    const limit = req.query.limit || 30;

    const response = await axios.get(
      "https://tenor.googleapis.com/v2/featured",
      {
        params: {
          key: process.env.TENOR_API_KEY,   // ✔ correct param
          limit,
          media_filter: "gif"
        }
      }
    );

    return res.json({
      success: true,
      results: response.data.results,
      next: response.data.next
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trending gifs",
      error: error.message
    });
  }
};

export const searchGifs = async (req, res) => {
  try {
    const { q } = req.query;
    const limit = req.query.limit || 30;

    const response = await axios.get(
      "https://tenor.googleapis.com/v2/search",
      {
        params: {
          key: process.env.TENOR_API_KEY,
          q,
          limit,
          media_filter: "gif"
        }
      }
    );

    return res.json({
      success: true,
      results: response.data.results,
      next: response.data.next
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch search gifs",
      error: error.message
    });
  }
};
