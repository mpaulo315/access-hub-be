import { Request, Response, Router } from "express";
import * as authController from "../../controllers/authController";
import { AuthControllerError } from "../../controllers/authController/errors";

export const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/profile", authController.profile);
// router.get("/profile", (req: Request, res: Response) => {
//   throw AuthControllerError.InvalidCredentials("Not implemented");
// });
