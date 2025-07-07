import { Request, Response } from "express";
import { authService } from "../services/auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const userdata = req.body;
    const result = await authService.signUpUser(userdata);
    res.status(200).json({ data: result, msg: "User created successfully" });
  } catch (error) {
    throw error;
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const userdata = req.body;
    const result = await authService.logInUser(userdata);
    res.status(200).json({ data: result, msg: "User loggedin successfully" });
  } catch (error) {
    throw error;
  }
};

const logout = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const authController = {
  signup,
  login,
  logout,
};
