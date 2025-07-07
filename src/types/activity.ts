// src/types/activity.ts
import { Types } from "mongoose";

export enum ActivityType {
  EXPENSE_ADDED = "expense_added",
  PAYMENT_MADE = "payment_made",
  GROUP_JOINED = "group_joined",
  SETTLEMENT = "settlement",
}

// src/types/activity.ts (continued)
export interface IActivity {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  type: ActivityType;
  description: string;
  relatedExpenseId?: Types.ObjectId;
  relatedGroupId?: Types.ObjectId;
  relatedUserId?: Types.ObjectId;
  amount?: number;
  createdAt?: Date;
}
