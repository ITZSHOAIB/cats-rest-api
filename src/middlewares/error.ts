import mongoose from "mongoose";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  const statusCode =
    err.statusCode || err instanceof mongoose.Error ? 400 : 500;

  res.status(statusCode).send({
    message: err.message,
    statusCode,
  });
};
