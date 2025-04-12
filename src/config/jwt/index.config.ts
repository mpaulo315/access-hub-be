import { config } from "dotenv";

config();

export const jwtKey = process.env.JWT_KEY;
export const jwtExpire = process.env.JWT_EXPIRES_IN;
