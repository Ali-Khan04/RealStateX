import express from "express";
import {
  updateAvatar,
  updateUser,
  deleteProfile,
} from "../controller/updateProfile.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/avatar/:userId", verifyToken, updateAvatar);
router.put("/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteProfile);

export default router;
