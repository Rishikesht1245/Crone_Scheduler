import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();

// cors setup
app.use(cors());

// parse the req.body : extended true to parse complex data
app.use(express.urlencoded({ extended: true }));
// parses json data
app.use(express.json({ limit: "2mb" }));

// error handling middleware
app.use((error, req, res, next) => {
  console.log("Error occurred", error);
  return res
    .status(500)
    .json({ success: false, message: "Something went wrong" });
});

// unhandled exception
process.on("uncaughtException", (error) => {
  console.log("UnCaught exception occurred!", error);
});

// connection to DB
connectDB();

// listening to port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
