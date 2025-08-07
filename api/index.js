import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import testRouter from "./routes/testRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use(express.json());
//app.use("/test", testRouter);
app.use("/auth", authRouter);
app.listen(3000, () => {
  console.log("Server is Running at http://localhost:3000");
});
