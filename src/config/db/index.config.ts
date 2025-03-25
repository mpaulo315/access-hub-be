import dotenv from "dotenv";

dotenv.config();

export default {
    db: process.env.DATABASE,
    collection: process.env.COLLECTION,
    uri: process.env.URI,
}