import { Request, Response } from "express";
import pool from "../db.js";

class userControllers {
  login(req: Request, res: Response) {
    console.log(pool);
  }

  signup(req: Request, res: Response) {
    res.send("signup");
  }

  logout(req: Request, res: Response) {
    res.send("logout");
  }
}

export default new userControllers();
