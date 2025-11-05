// server/src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    // Step 1: Check for Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        // Step 2: If there’s no token in the header → stop here
      return res
        .status(401)
        .json({ success: false, message: "No token provided" }); // <-- use status
    }

    // Step 3: If token exists, verify it using JWT_SECRET

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");

     // Step 4: Find the user from DB using token’s payload (decoded.id)

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

     // Step 5: Attach user to req and move to next controller

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error :", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
