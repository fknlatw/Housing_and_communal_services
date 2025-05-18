import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";

const router = Router();

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.post("/logout", userControllers.logout);

export default router;
