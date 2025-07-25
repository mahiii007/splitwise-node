import { Mongoose, ClientSession } from "mongoose";
import activityModel from "../models/activity.model";
import { IActivity } from "../types/activity";

const logActivity = async (
  activityData: Partial<IActivity>,
  session: ClientSession
) => {
  try {
    const [activity] = await activityModel.create([activityData], { session });
    return { activity, session };
  } catch (error) {
    throw error;
  }
};

const fetchActivities = async (query: {
  relatedExpenseId?: string;
  relatedGroupId?: string;
  userId?: string;
}) => {
  try {
    const activities = await activityModel.find(query);
    return activities;
  } catch (error) {
    throw error;
  }
};

export const activityService = {
  logActivity,
  fetchActivities,
};
