import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
export const userRoutes = Router();
userRoutes.get("/", getAllUsers);
