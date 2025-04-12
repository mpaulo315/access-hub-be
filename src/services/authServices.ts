import * as jwt from "jsonwebtoken";

import { jwtKey } from "../config/jwt/index.config";

type DecodedToken = jwt.JwtPayload & {
  userId: string;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtKey!);
    return decoded as DecodedToken;
  } catch (error) {
    return null;
  }
};