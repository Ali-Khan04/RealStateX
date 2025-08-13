import express from "express";
import { signUpAuth } from "../controller/authController.js";
import { signInAuth } from "../controller/signIn.js";
const router = express.Router();
router.post("/signup", signUpAuth);
router.post("/signin", signInAuth);
export default router;
