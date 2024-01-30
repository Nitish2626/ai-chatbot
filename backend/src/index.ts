import express from "express";
import "dotenv/config";
import { connectToDb } from "./db/dbConnection.js";
import { appRouter } from "./routes/allRoutes.js";

const port=process.env.PORT || 5000;

const app=express();

app.use(express.json());

app.use("/api/v1",appRouter);

app.listen(port,()=>{
    console.log("Server started at port",port);
    connectToDb();
});