import { config } from "dotenv";
config();

export const port = process.env.PORT || 3000;
export const frontendUrl = process.env.FRONTEND_URL;

