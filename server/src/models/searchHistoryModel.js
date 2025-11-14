import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    keyword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// last 10 searches only for each user
searchHistorySchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("SearchHistory", searchHistorySchema);
