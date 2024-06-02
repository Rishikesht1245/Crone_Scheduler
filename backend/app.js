import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import userRouter from "./routes/user.router.js";
import runJobs from "./utils/cronJob.js";
import path from "path";

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

// for deployment
// for deployment
const __dirname = path.resolve();
console.log(__dirname, "==dirname");
app.use(express.static(path.join(__dirname, "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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
