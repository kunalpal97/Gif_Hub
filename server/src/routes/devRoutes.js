// server/src/routes/devRoutes.js
import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/create-test-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    const user = await User.findOneAndUpdate(
      { email },
      { name, email },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
    res.json({ success: true, user, token });
  } catch (err) {
    console.error("Dev create user error:", err);
    res.status(500).json({ success: false, message: "Dev user creation failed" });
  }
});

export default router;
