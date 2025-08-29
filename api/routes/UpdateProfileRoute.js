import express from "express";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/avatar/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { avatar } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    if (!avatar || typeof avatar !== "string") {
      return res.status(400).json({ error: "Valid avatar data is required" });
    }

    if (!avatar.startsWith("data:image/")) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.avatar = avatar;
    await user.save();

    res.status(200).json({
      message: "Avatar updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Avatar update error:", err);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: " + err.message });
    }

    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    res.status(500).json({ error: "Server error occurred" });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.authProvider === "google" && req.body.email) {
      delete req.body.email;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
