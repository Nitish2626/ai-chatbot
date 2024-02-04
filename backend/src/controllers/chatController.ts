import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel.js";
import { configureOpenai } from "../config/openaiConfig.js";
import OpenAI from "openai";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    // console.log(message);
    try {
        const user = await userModel.findById(res.locals.jwtData.id);
        // console.log(user);
        if (!user) {
            res.status(401).send("User is not Registered");
        }
        else {
            user.chats.push({ role: "user", content: message });
            console.log(user);
            const chats = user.chats.map(({ role, content }:any) => ({ role, content }));
            // chats.push({ role: "user", content: message });
            console.log("chats",chats);
            // const config = configureOpenai();
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
                organization: process.env.OPENAI_ORGANIZATION_ID
            });
            console.log("Openai",openai);
            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats,
                stream: true,
            });
            for await(const chunk of chatResponse){
                console.log("res",chunk.choices[0]?.delta?.content || "");
            };
            console.log("chat response",chatResponse);
            // user.chats.push(chatResponse.choices[0].message);
            await user.save();
            res.status(200).send({ chats: user.chats });
        }
    }
    catch (error) {
        console.log("Error",error);
        res.status(500).send("Internal Server Error");
    }
}