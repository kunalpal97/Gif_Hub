// src/controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
const JWT_EXPIRES = "7d";

/**
 * Creates a JWT for a user id
 */
function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

/**
 * POST /api/users/signup
 * Body: { name, email, password }
 * Returns: { success: true, user, token }
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "name, email and password required" });

    if(password.length < 6){
      return res.status(400).json({
        message: "Password Must be 6 Character Long"
      })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please Enter valid Email",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = createToken(user._id);
    res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

/**
 * POST /api/users/login
 * Body: { email, password }
 * Returns: { success: true, user, token }
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = createToken(user._id);
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
