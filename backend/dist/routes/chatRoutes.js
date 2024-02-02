import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { generateChatCompletion } from "../controllers/chatController.js";
export const chatRoutes = Router();
chatRoutes.post("/new", verifyToken, generateChatCompletion);
