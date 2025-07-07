import { Router } from "express";
import { userRouter } from "./user.route";
import { authRouter } from "./auth.route";
import { authUser } from "../middleware/userAuth";

const router = Router();

router.use("/users", authUser, userRouter);
router.use("/auth", authRouter);

export { router as apiV1Router };
