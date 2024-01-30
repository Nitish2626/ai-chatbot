import express from "express";
import "dotenv/config";
import { connectToDb } from "./db/dbConnection.js";
import { appRouter } from "./routes/allRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.listen(port, () => {
    console.log("Server started at port", port);
    connectToDb();
});
