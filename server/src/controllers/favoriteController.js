import Favorite from "../models/favModel.js";

export const addFavorite = async (req, res) => {
  try {
    const user = req.user;
    const { gifId, gifUrl, title } = req.body;
    if (!gifId || !gifUrl)
      return res
        .status(400)
        .json({ success: false, message: "gifId and gifUrl required" });

    const fav = await Favorite.findOneAndUpdate(
      { user: user._id, gifId },
      { user: user._id, gifId, gifUrl, title },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json({ success: true, favorite: fav });
  } catch (err) {
    console.error("Add favorite error:", err);
    res.status(500).json({ success: false, message: "Failed to add favorite" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favs = await Favorite.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, favorites: favs });
  } catch (err) {
    console.error("Get favs error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get favorites" });
  }
};

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
