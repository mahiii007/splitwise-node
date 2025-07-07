// src/models/Expense.ts
import { Schema, model } from "mongoose";
import { IExpense, IExpenseSplit, ExpenseStatus } from "../types/expense";

const ExpenseSplitSchema = new Schema<IExpenseSplit>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    percentage: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { _id: false }
);

const ExpenseSchema = new Schema<IExpense>(
  {
    description: { type: String, required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    payerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(ExpenseStatus),
      default: ExpenseStatus.PENDING,
    },
    split: { type: [ExpenseSplitSchema], default: [] },
    notes: { type: String },
    imageUrl: { type: String },
    category: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default model<IExpense>("Expense", ExpenseSchema);
