import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log("server hosted on http://localhost:" + PORT);
});
