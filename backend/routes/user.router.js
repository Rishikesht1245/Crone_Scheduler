import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
  res.send("The server is working fine");
});

userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.createUser);

userRouter
  .route("/:userId/schedules")
  .get(userController.getAllSchedules)
  .post(userController.createSchedule);

userRouter
  .route("/:userId/schedules/:id")
  .put(userController.updateSchedule)
  .delete(userController.deleteSchedule);

export default userRouter;
