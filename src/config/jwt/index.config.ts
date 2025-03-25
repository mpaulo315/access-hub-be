import dotenv from "dotenv"

dotenv.config();

export const jwtKey = process.env.JWT_KEY;
export const jwtExpire = process.env.JWT_EXPIRE;