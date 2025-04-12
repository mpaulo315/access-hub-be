import { log } from "winston";
import { HTTPException } from "../../typings/HTTPException";
import { logger } from "../logger";
import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";


const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof HTTPException ? err.status : 500;
  const message = err.message || "Internal Server Error";
  const className = err.name;

  res.json({
    status,
    message,
    className,
  });
};

export default ErrorHandler;