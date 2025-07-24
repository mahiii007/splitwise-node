import { Request, Response } from "express";
import { IUser } from "./user";

export interface CustomRequest extends Request {
  user?: Omit<
    IUser,
    | "password"
    | "friends"
    | "createdAt"
    | "updatedAt"
    | "profilePictureUrl"
    | "isActive"
  > & { _id: string };
  validated?: {
    body?: any;
    query?: any;
    params?: any;
    headers?: any;
  };
}
