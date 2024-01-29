import express from "express";
import "dotenv/config";
import { connectToDb } from "./db/dbConnection.js";
const port = process.env.PORT || 5000;
const app = express();
app.listen(port, () => {
    console.log("Server started at port", port);
    connectToDb();
});
