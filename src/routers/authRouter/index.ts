import { Router } from "express";
import * as authController from "../../controllers/authController";

export const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);