import { Request, Response } from "express";
import { userService } from "../services/user.service";

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await userService.getUserProfile(userId);
    res
      .status(200)
      .json({ data: result, msg: "User profile retrieved successfully" });
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userDetails = req.body;
    const result = await userService.updateUserDetails(userDetails);
    res
      .status(200)
      .json({ data: result, msg: "User profile updated successfully" });
  } catch (error) {
    throw error;
  }
};

export const userController = {
  getUserProfile,
  updateUserProfile,
};
