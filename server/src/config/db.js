// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

mongoose.set("strictQuery", true);

export default function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}
