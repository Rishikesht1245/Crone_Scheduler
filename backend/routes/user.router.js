import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/test", userController.createUser);

userRouter.route("/").get();

export default userRouter;
