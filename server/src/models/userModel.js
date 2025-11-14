
// src/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // providerId optional (if you integrate OAuth later)
    providerId: { type: String, default: null },

    name: { type: String, required: true },

    // email used to login
    email: { type: String, required: true, unique: true },

    // hashed password. If using OAuth-only for some users, this can be null;
    // but for local login we require a password when creating account.
    password: { type: String, required: true },

    avatar: { type: String, default: null },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
