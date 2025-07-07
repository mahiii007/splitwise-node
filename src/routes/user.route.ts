import { Router, Request, Response } from "express";
import { userController } from "../controllers/user.controller";
const router = Router();

router.get("/:id", userController.getUserProfile);

router.put("/:id", userController.updateUserProfile);

export { router as userRouter };
