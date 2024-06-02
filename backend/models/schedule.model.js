import mongoose, { Schema } from "mongoose";

const ScheduleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    default: new Date(),
  },
});

const Schedule = mongoose.model("Schedules", ScheduleSchema);
export default Schedule;
