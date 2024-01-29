import express from "express";
import { appRouter } from "./routes/allRoutes.js";
export const app = express();
app.use(express.json());
app.use("/api/v1", appRouter);
