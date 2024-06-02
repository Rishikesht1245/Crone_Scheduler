import Schedule from "../models/schedule.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import { comparePassword, hashPassword } from "../utils/passwordManager.js";

export const userController = {
  createUser: async (req, res, next) => {
    if (!req?.body?.email || !req?.body?.name || !req?.body?.password) {
      // throw new error will go to unhandledException
      // throw new Error("Required fields are not provided!");
      return next(errorHandler(404, "Required fields are missing!"));
    }

    try {
      const hashedPassword = hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return next(errorHandler(404, "User already existing!"));
      }
      await User.create(req.body);
      return res
        .status(201)
        .json({ success: true, message: "User created successful!" });
    } catch (error) {
      console.log("Error in creating user : ", error);
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    if (!req?.body?.email || !req?.body?.password) {
      return next(errorHandler(404, "Required fields are not provided!"));
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user && comparePassword(password, user?.password)) {
        user = user.toObject();
        delete user.password;
        res
          .status(200)
          .json({ success: true, message: "Login successful!", data: user });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials!" });
      }
    } catch (error) {
      next(error);
    }
  },

  getAllSchedules: async (req, res, next) => {
    if (!req?.params?.userId) {
      return next(errorHandler(404, "UserId is missing!"));
    }
    try {
      const userId = req.params.userId;
      const allSchedules = await Schedule.find({ userId })
        .populate({ path: "userId", select: "-password" })
        .select("-password")
        .exec();
      if (allSchedules && allSchedules?.length > 0) {
        res.status(200).json({
          success: true,
          message: "Schedules found!",
          data: allSchedules || [],
        });
      } else {
        res.status(200).json({
          success: true,
          message: "No schedules found!",
          data: [],
        });
      }
    } catch (error) {
      console.log("Error in fetching schedules", error);
      next(error);
    }
  },

  createSchedule: async (req, res, next) => {
    if (!req?.body?.name || !req?.params?.userId) {
      return next(errorHandler(404, "Required fields are missing!"));
    }
    const { userId } = req.params;
    try {
      const newSchedule = new Schedule({ ...req.body, userId });
      await newSchedule.save();
      res.status(201).json({
        success: true,
        message: "Schedule created successfully!",
        data: newSchedule,
      });
    } catch (error) {
      console.log("Error in creating schedule", error);
      next(error);
    }
  },

  updateSchedule: async (req, res, next) => {
    if (!req?.params?.id || !req?.params?.userId) {
      return next(errorHandler(404, "Ids are missing!"));
    }
    try {
      const { id, userId } = req.params;
      const currentSchedule = await Schedule.findOne({ userId });
      // don't use strict comparison here since type of IDs will be different
      if (currentSchedule.userId != userId) {
        return next(
          errorHandler(401, "You are not authorized to edit the schedule")
        );
      }
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "Schedule updated successfully!",
        data: updatedSchedule,
      });
    } catch (error) {
      console.log("Error in updating schedule", error);
      next(error);
    }
  },

  deleteSchedule: async (req, res, next) => {
    if (!req?.params?.id || !req?.params?.userId) {
      return next(errorHandler(404, "Ids are missing!"));
    }
    try {
      const { id, userId } = req.params;
      const currentSchedule = await Schedule.findOne({ userId });
      if (currentSchedule.userId != userId) {
        return next(
          errorHandler(401, "You are not authorized to edit the schedule")
        );
      }
      await Schedule.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Schedule deleted successfully!",
      });
    } catch (error) {
      console.log("Error in deleting schedule", error);
      next(error);
    }
  },
};
