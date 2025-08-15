import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
//import testRouter from "./routes/testRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
//app.use("/test", testRouter);
app.use("/auth", authRouter);

// middlware for general error handleing
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server ERROR";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000, () => {
  console.log("Server is Running at http://localhost:3000");
});
