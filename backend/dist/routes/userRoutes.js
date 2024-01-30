import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/userController.js";
export const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", userSignup);
