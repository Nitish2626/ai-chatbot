import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel.js";
import { configureOpenai } from "../config/openaiConfig.js";
import OpenAI from "openai";

export const generateChatCompletion=async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const {message}=req.body;
    try {
        const user=await userModel.findById(res.locals.jwtData.id);
        if(!user){
            res.status(401).send("User is not Registered");
        }
        else{
            const chats= user.chats.map(({role,content}:any)=>({role,content}));
            chats.push({role:"user",content:message});
            user.chats.push({role:"user",content:message});
    
            const config=configureOpenai();
            const openai=new OpenAI();
            const chatResponse=await openai.chat.completions.create({
                model:"gpt-3.5-turbo",
                messages:chats
            });
            user.chats.push(chatResponse.choices[0].message);
            await user.save();
            res.status(200).send({chats:user.chats});
        }
    } 
    catch (error) {
        console.log("Error");
        res.status(500).send("Internal Server Error");
    }
}