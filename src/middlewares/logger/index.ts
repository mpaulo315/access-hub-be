import * as winston from "winston";
import { Router, Request, Response, NextFunction } from "express";

export const router = Router();

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }: winston.Logform.TransformableInfo) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
  silent: false, // Set to true to disable logging
});

router.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
  logger.info(`[${res.statusCode}] ${req.url}`);
  // return;
});
