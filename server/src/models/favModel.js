
// src/models/favModel.js
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gifId: { type: String, required: true },
  gifUrl: { type: String, required: true },
  title: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

favoriteSchema.index({ user: 1, gifId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
