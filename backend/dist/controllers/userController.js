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
        const findUser = yield userModel.find({ email });
        if (email !== (findUser === null || findUser === void 0 ? void 0 : findUser.email)) {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const newUser = new userModel({ name, email, password: hashedPassword });
            yield newUser.save();
            res.status(200).send(newUser);
        }
        else {
            res.status(201).send("You have already registered please Login");
        }
    }
    catch (error) {
        console.log("User Signup Error", error);
    }
});
