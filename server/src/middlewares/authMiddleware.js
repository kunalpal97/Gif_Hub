// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized - no token" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    // find user and attach to req.user (omit password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message || err);
    return res.status(401).json({ success: false, message: "Not authorized or token expired" });
  }
};

