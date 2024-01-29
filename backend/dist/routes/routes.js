import { Router } from "express";
import { userRoutes } from "./user.js";
import { chatRoutes } from "./chatRoutes.js";
export const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chats", chatRoutes);
