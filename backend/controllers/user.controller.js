import { errorHandler } from "../utils/errorHandler.js";

export const userController = {
  createUser: async (req, res, next) => {
    if (!req?.body?.email || !req?.body?.name || !req?.body?.password)
      // throw new error will go to unhandledException
      // throw new Error("Required fields are not provided!");
      next(errorHandler(404, "Required fields are missing!"));
  },
};
