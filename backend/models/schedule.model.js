import mongoose, { Schema } from "mongoose";

const ScheduleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedules", ScheduleSchema);
export default Schedule;
