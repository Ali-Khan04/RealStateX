import User from "../models/userSchema.js";
import mongoose from "mongoose";
import { exceptionHandler } from "../utils/exceptionHandler.js";

export const updateAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const { avatar } = req.body;

    if (!userId) {
      return next(exceptionHandler(400, "Id is required"));
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(exceptionHandler(400, "inavlid Id format"));
    }

    if (!avatar || typeof avatar !== "string") {
      return next(exceptionHandler(400, "inavlid image format"));
    }

    if (!avatar.startsWith("data:image/")) {
      return next(exceptionHandler(400, "inavlid image format"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(exceptionHandler(404, "User not found"));
    }

    user.avatar = avatar;
    const savedUser = await user.save();
    res.status(200).json({
      message: "Avatar updated successfully",
      avatarUrl: savedUser.avatar,
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        avatar: savedUser.avatar,
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
};
export const updateUser = async (req, res) => {
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
    next(err);
  }
};
export const deleteProfile = async (req, res, next) => {
  try {
    if (req.userId !== req.params.userId) {
      return next(
        exceptionHandler(
          401,
          "Unauthorized: You can only delete your own account"
        )
      );
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(exceptionHandler(404, "User not found"));
    }

    await User.findByIdAndDelete(req.params.userId);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Delete profile error:", error);
    next(error);
  }
};
