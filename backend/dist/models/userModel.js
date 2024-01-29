import mongoose from "mongoose";
export const chatsSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatsSchema]
});
export const userModel = mongoose.model("user", userSchema);
