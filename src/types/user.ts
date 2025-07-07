// src/types/user.ts
import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePictureUrl: string;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  friends: Types.ObjectId[];
  groups: Types.ObjectId[];
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
