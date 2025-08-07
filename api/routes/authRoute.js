import express from "express";
import { signUpAuth } from "../controller/authController.js";
const router = express.Router();
router.post("/signup", signUpAuth);
export default router;
