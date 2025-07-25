import activityModel from "../models/activity.model";
import expenseModel from "../models/expense.model";
import groupModel from "../models/group.model";
import userModel from "../models/user.model";
import { ActivityType, IActivity } from "../types/activity";
import { IExpense, IExpenseSplit } from "../types/expense";
import { activityService } from "./activity.service";
import mongoose from "mongoose";

const createExpense = async (
  expenseData: Partial<IExpense>,
  groupId: string,
  userId: string
) => {
  const session = await expenseModel.startSession();
  try {
    session.startTransaction();
    const groupobjId = new mongoose.Types.ObjectId(groupId);
    const payerIdobjId = new mongoose.Types.ObjectId(expenseData?.payerId);
    const group = await groupModel.findById(groupobjId);
    if (!group) {
      return { success: false, message: "Group not found" };
    }
    const user = await userModel.findById(payerIdobjId);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!expenseData.split || expenseData.split.length === 0) {
      expenseData.split = group.members.map((member) => {
        let obj: IExpenseSplit = <IExpenseSplit>{};
        obj.amount = (expenseData.amount ?? 0) / group.members.length;
        obj.userId = member.userId;
        obj.percentage = group.members.length ? 100 / group.members.length : 0;
        return obj;
      });
    }
    const [expense] = await expenseModel.create(
      [
        {
          ...expenseData,
          groupId: groupobjId,
        },
      ],
      { session }
    );
    const activityLog: Partial<IActivity> = {
      amount: expenseData.amount,
      description: "expense added",
      relatedExpenseId: expense._id,
      relatedGroupId: new mongoose.Types.ObjectId(groupId?.toString()),
      userId: new mongoose.Types.ObjectId(userId?.toString()),
      type: ActivityType.EXPENSE_ADDED,
    };
    const [activity] = await activityModel.create([activityLog], { session });
    await session.commitTransaction();
    return {
      success: true,
      message: "Expense created successfully",
      data: expense,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
const getExpense = async (id: string) => {
  try {
    const expense = await expenseModel.findById(id);
    if (!expense) {
      return { success: false, message: "Expense not found" };
    }
    return {
      success: true,
      message: "Expense retrieved successfully",
      data: expense,
    };
  } catch (error) {
    throw error;
  }
};
const updateExpense = async (
  id: string,
  expenseData: Partial<IExpense>,
  groupId: string,
  userId: string
) => {
  const session = await expenseModel.startSession();
  try {
    const group = await groupModel.findById(groupId);
    if (!group) {
      return { success: false, message: "Group not found" };
    }
    session.startTransaction();
    const expense = await expenseModel.findByIdAndUpdate(
      { _id: id, groupId, isDeleted: false },
      expenseData,
      {
        new: true,
        session,
      }
    );
    if (!expense) {
      return { success: false, message: "Expense not found" };
    }
    const activityLog: Partial<IActivity> = {
      amount: expenseData.amount,
      description: "expense updated",
      relatedExpenseId: expense._id,
      relatedGroupId: new mongoose.Types.ObjectId(groupId?.toString()),
      userId: new mongoose.Types.ObjectId(userId?.toString()),
      type: ActivityType.EXPENSE_EDITED,
    };
    const [activity] = await activityModel.create([activityLog], { session });
    await session.commitTransaction();
    return {
      success: true,
      message: "Expense updated successfully",
      data: expense,
    };
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};
const deleteExpense = async (id: string, groupId: string, userId: string) => {
  try {
    const group = await groupModel.findById(groupId);
    if (!group) {
      return { success: false, message: "Group not found" };
    }
    const expense = await expenseModel.findByIdAndUpdate(
      { _id: id, groupId, userId, isDeleted: false },
      { isDeleted: true }
    );
    if (!expense) {
      return { success: false, message: "Expense not found" };
    }
    return { success: true, message: "Expense deleted successfully" };
  } catch (error) {
    throw error;
  }
};
const getExpenseList = async (
  groupId: string,
  pageNo: number = 1,
  pageSize: number = 10,
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
) => {
  try {
    let sortOptions = {};
    if (sortBy) {
      sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    } else {
      sortOptions = { createdAt: -1 }; // Default sort by creation date
    }
    const expenses = await expenseModel
      .find({ groupId, isDeleted: false })
      .sort(sortOptions)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize);
    return {
      success: true,
      message: "Expense list retrieved successfully",
      data: expenses,
    };
  } catch (error) {
    throw error;
  }
};

export const expenseService = {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseList,
};
