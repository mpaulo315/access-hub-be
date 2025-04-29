import Express from "express";
import { Request, Response } from "express";
import { frontendUrl, port } from "./config/server/index.config";
import { router as authRouter } from "./routers/authRouter";
import ErrorHandler from "./middlewares/errorHandler";
import TokenVerifier from "./middlewares/authenticator";
import cors from "cors";
import cookieParser from "cookie-parser";
import https from "https";

import fs from "fs";

const app = Express();

app.use(Express.json());

app.use(cookieParser("secret"));

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(authRouter);

app.get("/", TokenVerifier, async (req: Request, res: Response) => {
  res.status(200).json({ message: `Hello, user ID ${req.body.userId}` });
});

app.use(ErrorHandler);

if (process.env.NODE_ENV !== "development") {
  const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  };

  https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on port ${port}: https://localhost:${port} (HTTPS Localhost)`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}: https://localhost:${port}`);
  });
}

