import Express from "express";
import { Request, Response } from "express";
import { PORT } from "./config/server/index.config";
import { router as authRouter } from "./routers/authRouter";
import ErrorHandler from "./middlewares/errorHandler";
// import { router as loggerRouter } from "./middlewares/logger";
import TokenVerifier from "./middlewares/authenticator";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = Express();

app.use(Express.json());

app.use(cookieParser())

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST"],
}))

app.use(authRouter);

app.get("/", TokenVerifier, async (req: Request, res: Response) => {
  res.status(200).json({message: `Hello, user ID ${req.body.userId}`});
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
