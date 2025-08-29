import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const signUpAuth = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, hashedPassword });

  try {
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
    next(err);
  }
};
