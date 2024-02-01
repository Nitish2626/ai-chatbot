import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/tokenManager.js";

export const userRoutes=Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",userSignup);
userRoutes.post("/login",userLogin);
userRoutes.get("/status",verifyToken,verifyUser);