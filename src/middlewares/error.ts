import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    err.statusCode || err instanceof mongoose.Error ? 400 : 500;

  res.status(statusCode).send({
    message: err.message,
    statusCode,
  });
};
