import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../services/authServices";

import { AuthError } from "./errors";
import { cookieName } from "../../config/jwt/index.config";

const TokenVerifier = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[cookieName!];
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

export default TokenVerifier;
