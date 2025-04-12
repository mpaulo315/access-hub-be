import postgres from "postgres";
import * as dbConfig from "../../config/db/index.config";

export const sql = postgres(dbConfig.DATABASE_URL!);


