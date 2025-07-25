import { activityService } from "../services/activity.service";
import { CustomRequest } from "../types/express";
import { Response } from "express";
import { logger } from "../utils/logger";

const getActivities = async (req: CustomRequest, res: Response) => {
  try {
    const { relatedExpenseId, relatedGroupId, userId } = req.query;
    const activities = await activityService.fetchActivities({
      relatedExpenseId: relatedExpenseId as string,
      relatedGroupId: relatedGroupId as string,
      userId: userId as string,
    });
    res
      .status(200)
      .json({ data: activities, msg: "Activities fetched successfully" });
  } catch (error) {
    logger.error("Error fetching activities:", error);
    res.status(500).json({ msg: "Error fetching activities", error });
  }
};

export const activityController = {
  getActivities,
};
