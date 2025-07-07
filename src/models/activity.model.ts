// src/models/Activity.ts
import { Schema, model } from "mongoose";
import { IActivity, ActivityType } from "../types/activity";

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: Object.values(ActivityType), required: true },
    description: { type: String, required: true },
    relatedExpenseId: { type: Schema.Types.ObjectId, ref: "Expense" },
    relatedGroupId: { type: Schema.Types.ObjectId, ref: "Group" },
    relatedUserId: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default model<IActivity>("Activity", ActivitySchema);
