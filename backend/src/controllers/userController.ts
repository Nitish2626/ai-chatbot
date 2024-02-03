import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ name, email, password: hashedPassword });
            await newUser.save();

            res.clearCookie(COOKIE_NAME, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true
            });

            const token = createToken(newUser._id.toString(), newUser.email, "7d");
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            res.cookie(COOKIE_NAME, token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true
            });

            res.status(201).send({ name: newUser.name, email: newUser.email });
        }
        else {
            res.status(401).send("You have already registered please Login");
        }
    }
    catch (error) {
        console.log("User Signup Error", error);
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
            if (isPasswordCorrect) {
                res.clearCookie(COOKIE_NAME, {
                    path: "/",
                    domain: "localhost",
                    httpOnly: true,
                    signed: true
                });

                const token = createToken(findUser._id.toString(), findUser.email, "7d");
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie(COOKIE_NAME, token, {
                    path: "/",
                    domain: "localhost",
                    expires,
                    httpOnly: true,
                    signed: true
                });
                return res.status(200).send({ name: findUser.name, email: findUser.email });
            }
            else {
                res.status(403).send("Password is incorrect");
            }
        }
        else {
            res.status(401).send("User not registered");
        }
    } catch (error) {
        console.log("User Login Error", error);
    }
};

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await userModel.findById({ _id: res.locals.jwtData.id });
    if (!user) {
        res.status(401).send("User not registered or Token malfunctioned");
    }
    else {
       res.status(200).send({name:user?.name,email:user?.email});
    }
};