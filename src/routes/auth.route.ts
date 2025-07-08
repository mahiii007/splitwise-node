import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validateRequest";
import { signupSchema, loginSchema } from "../schemas/auth.schema";
const router = Router();

// Health check endpoint
router.post(
  "/signup",
  validateRequest({ body: signupSchema }),
  authController.signup
);

router.post(
  "/login",
  validateRequest({ body: loginSchema }),
  authController.login
);

router.post("/logout", authController.logout);

export { router as authRouter };
