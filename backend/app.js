import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import userRouter from "./routes/user.router.js";
import runJobs from "./utils/cronJob.js";

dotenv.config();

const app = express();

// cors setup
app.use(cors());

// parse the req.body : extended true to parse complex data
app.use(express.urlencoded({ extended: true }));
// parses json data
app.use(express.json({ limit: "2mb" }));

// connection to DB
connectDB();

// for jobs to send email
runJobs();

// routes
app.use("/api/v1/users", userRouter);

// error handling middleware for asynchronous errors
app.use((err, req, res, next) => {
  console.log(err.message, "=== app error message");
  const statusCode = err.statusCode || 500; // internal server error
  //mongo duplicate error || custom Error or Internal server error
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// error handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log("Uncaught exception occurred : ", error);
});

// listening to port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
