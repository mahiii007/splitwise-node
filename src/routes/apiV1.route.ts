import { Router } from "express";
import { userRouter } from "./user.route";
import { authRouter } from "./auth.route";
import { authUser } from "../middleware/userAuth";
import { groupRouter } from "./group.route";
import { expenseRouter } from "./expense.route";
import { activityRouter } from "./activity.route";

const router = Router();

router.use("/users", authUser, userRouter);
router.use("/auth", authRouter);
router.use("/groups", authUser, groupRouter);
router.use("/expenses", authUser, expenseRouter);
router.use("/activities", authUser, activityRouter);

export { router as apiV1Router };
