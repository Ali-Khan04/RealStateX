import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { exceptionHandler } from "../utils/exceptionHandler.js";

export const signUpAuth = async (req, res, next) => {
  //console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created");
  } catch (err) {
    //next(exceptionHandler(500,"Our custom Error"));
    next(err);
  }

  // res.send("Msg recieved!");
};
