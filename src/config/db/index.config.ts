import {config} from "dotenv";

config();

export const DATABASE = process.env.SUPABASE_DB;
export const USERNAME  = process.env.SUPABASE_USER;
export const PASSWORD = process.env.SUPABASE_PWD;
export const HOST = process.env.SUPABASE_HOST;
export const DATABASE_PORT = process.env.SUPABASE_PORT;
export const DATABASE_URL = process.env.SUPABASE_URL;
export const APP_NAME = process.env.APP_NAME;