import { verify } from "jsonwebtoken";
import { IUser } from "../types/user";
import { NextFunction, Request, Response } from "express";

export const authUser = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Pass the error to your global error handler
    return next({
      statusCode: 401,
      message: "No or invalid token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // You may want to type this (see below)
    next();
  } catch (err) {
    return next({
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};
