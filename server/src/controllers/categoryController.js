// Static categories - you can expand these later
const categories = [
  "Funny",
  "Animals",
  "Memes",
  "Love",
  "Sad",
  "Sports",
  "Happy",
  "Reaction",
  "Movies",
  "Anime"
];

// Return category list
export const getCategories = (req, res) => {
  res.json({ success: true, categories });
};
