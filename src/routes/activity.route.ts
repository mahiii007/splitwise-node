import { Router } from "express";
import { activityController } from "../controllers/activity.controller";
import { fetchActivitySchema } from "../schemas/activity.schema";
import { validateRequest } from "../middleware/validateRequest";
const router = Router();

router.get(
  "/",
  validateRequest({ query: fetchActivitySchema }),
  activityController.getActivities
);

export { router as activityRouter };
