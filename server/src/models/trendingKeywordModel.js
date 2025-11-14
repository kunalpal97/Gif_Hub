import mongoose from "mongoose";

const trendingKeywordSchema = new mongoose.Schema({
    keyword: { type: String, required: true, unique: true },
    count: { type: Number, default: 1 }
});

trendingKeywordSchema.index({ count: -1 });

export default mongoose.model("TrendingKeyword", trendingKeywordSchema);
