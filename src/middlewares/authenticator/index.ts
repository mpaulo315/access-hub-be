import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../services/authServices";

import { AuthError } from "./errors";

const TokenVerifier = (req: Request, res: Response, next: NextFunction) => {
  const rawToken = req.header("Authorization");
  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    throw AuthError.UnauthorizedError("No token provided");
  }

  const token = rawToken.split(" ")[1]
  const decoded = verifyToken(token);
  if (!decoded) {
    throw AuthError.InvalidTokenError("Invalid token");
  }

  req.body.userId = decoded.userId;
  next();
};

export default TokenVerifier;
