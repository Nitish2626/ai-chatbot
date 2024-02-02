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
import { configureOpenai } from "../config/openaiConfig.js";
import OpenAI from "openai";
export const generateChatCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    try {
        const user = yield userModel.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User is not Registered");
        }
        else {
            const chats = user.chats.map(({ role, content }) => ({ role, content }));
            chats.push({ role: "user", content: message });
            user.chats.push({ role: "user", content: message });
            const config = configureOpenai();
            const openai = new OpenAI();
            const chatResponse = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats
            });
            user.chats.push(chatResponse.choices[0].message);
            yield user.save();
            res.status(200).send({ chats: user.chats });
        }
    }
    catch (error) {
        console.log("Error");
        res.status(500).send("Internal Server Error");
    }
});
