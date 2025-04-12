import Express from "express";
import { Request, Response } from "express";
import { PORT } from "./config/server/index.config";
import { router as authRouter } from "./routers/authRouter";
import ErrorHandler from "./middlewares/errorHandler";
import { router as loggerRouter } from "./middlewares/logger";
import "express-async-errors"
import { AuthControllerError } from "./controllers/authController/errors";

const app = Express();

app.use(Express.json());

// app.use(loggerRouter);

app.use(authRouter);

app.get("/", async (req: Request, res: Response) => {
  // res.json({ body: req.body });
  throw AuthControllerError.InvalidCredentials("Teste");
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
