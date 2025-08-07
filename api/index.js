import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRouter from "./routes/testRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use("/test", testRouter);
app.listen(3000, () => {
  console.log("Server is Running at http://localhost:3000");
});
