import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exceptionHandler } from "../utils/exceptionHandler.js";

export const signInAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return next(exceptionHandler(404, "Wrong Email or Password"));

    const validPassword = bcrypt.compareSync(
      password,
      validUser.hashedPassword
    );
    if (!validPassword)
      return next(exceptionHandler(404, "Wrong Email or Password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        user: {
          _id: validUser._id,
          username: validUser.username,
          email: validUser.email,
          avatar: validUser.avatar || "",
          phone: validUser.phone || "",
          bio: validUser.bio || "",
        },
      });
  } catch (err) {
    next(err);
  }
};
export const google = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      const generateUserPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generateUserPassword, 10);

      user = new User({
        username:
          req.body.name.replace(/\s+/g, "").toLowerCase() +
          Math.floor(Math.random() * 10000),
        email: req.body.email,
        hashedPassword,
        avatar: req.body.photo,
        authProvider: "google", // ✅ mark this as Google
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar || "",
          phone: user.phone || "",
          bio: user.bio || "",
          authProvider: user.authProvider, // ✅ send to frontend
        },
      });
  } catch (err) {
    next(err);
  }
};
