import SearchHistory from "../models/searchHistoryModel.js";
import TrendingKeyword from "../models/trendingKeywordModel.js";

// --------------------------------------------------
// SAVE USER SEARCH
// --------------------------------------------------
export const addSearch = async (req, res) => {
  try {
    const userId = req.user._id;
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({ success: false, message: "Keyword required" });
    }

    // Save to user history (max 10)
    await SearchHistory.create({ user: userId, keyword });

    // Remove older searches, keep only last 10
    const history = await SearchHistory.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(10);

    if (history.length > 0) {
      const ids = history.map((h) => h._id);
      await SearchHistory.deleteMany({ _id: { $in: ids } });
    }

    // Update trending keyword counts
    await TrendingKeyword.findOneAndUpdate(
      { keyword: keyword.toLowerCase() },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    return res.json({ success: true, message: "Search saved" });

  } catch (error) {
    console.error("Add search error:", error);
    return res.status(500).json({ success: false, message: "Failed to save search" });
  }
};

// --------------------------------------------------
// GET USER SEARCH HISTORY (last 10)
// --------------------------------------------------
export const getUserSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ success: true, history });

  } catch (error) {
    console.error("Get history error:", error);
    res.status(500).json({ success: false, message: "Failed to load history" });
  }
};

// --------------------------------------------------
// CLEAR USER SEARCH HISTORY
// --------------------------------------------------
export const clearSearchHistory = async (req, res) => {
  try {
    await SearchHistory.deleteMany({ user: req.user._id });
    res.json({ success: true, message: "History cleared" });
  } catch (error) {
    console.error("Clear history error:", error);
    res.status(500).json({ success: false, message: "Failed to clear history" });
  }
};

// --------------------------------------------------
// GET GLOBAL TRENDING SEARCHES
// --------------------------------------------------
export const getTrendingKeywords = async (req, res) => {
  try {
    const trending = await TrendingKeyword.find()
      .sort({ count: -1 })
      .limit(10);

    res.json({ success: true, trending });

  } catch (error) {
    console.error("Trending error:", error);
    res.status(500).json({ success: false, message: "Failed to load trending keywords" });
  }
};
