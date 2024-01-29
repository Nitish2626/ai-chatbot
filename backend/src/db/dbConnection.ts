import mongoose from "mongoose";

export const connectToDb=async()=>{
    try {
        const db=await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connection Error",error);
    }
};
