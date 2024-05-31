import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // use new mongoDB connection string parser
      useNewUrlParser: true,
      //engine
      useUnifiedTopology: true,
      dbName: "Cron_Scheduler",
    });
    console.log("Mongo DB connected!");
  } catch (error) {
    console.log("Error in connecting to Database - Mongo DB", error);
  }
};

export default connectDB;
