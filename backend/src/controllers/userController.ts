import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).send(allUsers);
    } 
    catch (error) {
        console.log("User Controller Error", error);
    }
};

export const userSignup=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try {
        const {name,email,password}=req.body;
        const findUser=await userModel.find({email});
        if(email!==findUser?.email){
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=new userModel({name,email,password:hashedPassword});
            await newUser.save();
            res.status(200).send(newUser);
        }
        else{
            res.status(201).send("You have already registered please Login");
        }
    } 
    catch (error) {
        console.log("User Signup Error",error);
    }
}