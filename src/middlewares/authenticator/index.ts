import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../services/authServices";

import { AuthError } from "./errors";

export const tokenVerifier = (
  req: Request,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    throw AuthError.UnauthorizedError("No token provided");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw AuthError.InvalidTokenError("Invalid token");
  }

  req.body.userId = decoded.userId;
  next();
};
