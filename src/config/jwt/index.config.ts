import { config } from "dotenv";

config();

const getMaxAge = (): number => {
    const jwtExpire = process.env.JWT_EXPIRES_IN;

    const days = Number(jwtExpire?.split("d")[0]) || 0;
    const hours = Number(jwtExpire?.split("d")[1]?.split("h")[0]) || 0;
    const minutes = Number(jwtExpire?.split("d")[1]?.split("h")[1]?.split("m")[0]) || 0;

    return days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}

export const jwtKey = process.env.JWT_KEY;
export const jwtExpire = process.env.JWT_EXPIRES_IN;
export const jwtMaxAge = getMaxAge();
export const cookieName = process.env.COOKIE_NAME;