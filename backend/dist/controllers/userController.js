var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userModel.find();
        res.status(200).send(allUsers);
    }
    catch (error) {
        console.log("User Controller Error", error);
    }
});
export const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const findUser = yield userModel.findOne({ email });
        if (!findUser) {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const newUser = new userModel({ name, email, password: hashedPassword });
            yield newUser.save();
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
});
export const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield userModel.findOne({ email });
        if (findUser) {
            const isPasswordCorrect = yield bcrypt.compare(password, findUser.password);
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
                res.status(200).send({ name: findUser.name, email: findUser.email });
            }
            else {
                res.status(403).send("Password is incorrect");
            }
        }
        else {
            res.status(401).send("User not registered");
        }
    }
    catch (error) {
        console.log("User Login Error", error);
    }
});
export const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.findById({ email: res.locals.jwtData.id });
    console.log(user);
    if (!user) {
        res.status(401).send("User not registered or Token malfunctioned");
    }
    else {
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permission didn't match");
        }
        else {
            res.status(200).send({ name: user.name, email: user.email });
            console.log(user.name, user.email);
        }
    }
});
