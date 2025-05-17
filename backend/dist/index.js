import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool, { checkPoolConnection } from "./db.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log("server hosted on http://localhost:" + PORT);
    checkPoolConnection(pool);
});
