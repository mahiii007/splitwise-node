import { Router } from "express";
import { authController } from "../controllers/auth.controller";
const router = Router();

// Health check endpoint
router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export { router as authRouter };
