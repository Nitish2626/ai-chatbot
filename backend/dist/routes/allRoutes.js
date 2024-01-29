import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { chatRoutes } from "./chatRoutes.js";
export const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chats", chatRoutes);
