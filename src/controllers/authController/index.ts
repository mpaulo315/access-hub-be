import { NextFunction, Request, Response } from "express";
import { BodyParamUserZod } from "../../typings/User";
import "express-async-errors";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as jwtConfig from "../../config/jwt/index.config";
import { AuthControllerError } from "./errors";
import { createUser, readUser } from "../../repositories/user";
// import { logger } from "../../middlewares/logger";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  const { error } = BodyParamUserZod.safeParse({ username, password });

  if (error) {
    throw AuthControllerError.InvalidCredentials(error!.message);
  }
  
  const rawUser = await readUser({ username, password });

  if (rawUser) {
    throw AuthControllerError.InvalidCredentials("Username already exists");
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = await createUser({ username, password: hashedPwd });

  res.status(201).json({ message: "User created successfully", user });
  return;
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await readUser({ username, password });

  if (!user) {
    throw AuthControllerError.UserNotFound("User not found");
  }

  const pwdMatch = await bcrypt.compare(password, user.password);
  if (!pwdMatch) {
    throw AuthControllerError.InvalidCredentials("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, jwtConfig.jwtKey!, {
    expiresIn: jwtConfig.jwtExpire,
    algorithm: "HS256",
  } as jwt.SignOptions);

  res.status(200).json({ message: "Login successful", token });
  
  return;
};