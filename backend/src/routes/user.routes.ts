import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";

const router = Router();

router.get("/signup", userControllers.signup);
router.get("/login", userControllers.login);
router.get("/logout", userControllers.logout);

export default router;
