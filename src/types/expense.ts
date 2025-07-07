// src/types/expense.ts
import { Types } from "mongoose";

export enum ExpenseStatus {
  PENDING = "pending",
  PAID = "paid",
  DELETED = "deleted",
}

// src/types/expense.ts (continued)
export interface IExpenseSplit {
  userId: Types.ObjectId;
  amount: number;
  percentage: number;
  isPaid: boolean;
  paidAt?: Date;
}

// src/types/expense.ts (continued)
export interface IExpense {
  _id?: Types.ObjectId;
  description: string;
  groupId: Types.ObjectId;
  amount: number;
  currency: string;
  payerId: Types.ObjectId;
  status: ExpenseStatus;
  split: IExpenseSplit[];
  notes?: string;
  imageUrl?: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
}
