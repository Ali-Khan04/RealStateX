import express from "express";
import { test, secondTest } from "../controller/test.js";
const router = express.Router();
router.get("/", test);
router.get("/message", secondTest);
export default router;
