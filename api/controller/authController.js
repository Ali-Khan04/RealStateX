import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { exceptionHandler } from "../utils/exceptionHandler.js";

export const signUpAuth = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log("Missing required fields");
    return next(
      exceptionHandler(400, "Username, email, and password are required")
    );
  }
  if (password.length < 6) {
    console.log("Password too short");
    return next(
      exceptionHandler(400, "Password must be at least 6 characters long")
    );
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        avatar: savedUser.avatar || "",
        phone: savedUser.phone || "",
        bio: savedUser.bio || "",
      },
    });
  } catch (err) {
    let statusCode = 500;
    let message = err.message;
    if (err.name === "ValidationError") {
      statusCode = 400;
    } else if (err.code === 11000) {
      statusCode = 409;
      message = "Email or username already exists";
    }

    next(exceptionHandler(statusCode, message));
  }
};
