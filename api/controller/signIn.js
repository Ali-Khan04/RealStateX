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

    const { hashedPassword, ...rest } = validUser._doc;

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, user: rest });
  } catch (err) {
    next(err);
  }
};
