import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IUserAddedRequest extends Request {
  user: string;
}

export const verifyToken = (
  req: IUserAddedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET || "CATS_REST_JWT";
    jwt.verify(token, secret, (err: any, data: any) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        req.user = data.id;
        next();
      }
    });
  }
};
