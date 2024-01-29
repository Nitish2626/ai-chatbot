import { NextFunction } from "express";
import { userModel } from "../models/userModel.js";

export const getAllUsers = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).send(allUsers);
    } catch (error) {
        console.log("User Controller Error", error);
    }
};