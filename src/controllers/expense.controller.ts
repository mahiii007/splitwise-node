import { expenseService } from "../services/expense.service";
import { CustomRequest } from "../types/express";
import { Response } from "express";
import { logger } from "../utils/logger";

const createExpense = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Creating expense with details:", req.body);
    const { groupId } = req.params;
    // const {description, amount, currency, payerId, notes, imageUrl, split} = req.body
    const expenseDetails = req.body;
    const userId = req?.user?._id as string;
    const result = await expenseService.createExpense(
      expenseDetails,
      groupId,
      userId
    );
    res.status(200).json({ data: result, msg: "Expense created successfully" });
  } catch (error) {
    logger.error("Error creating expense:", error);
    res.status(500).json({ msg: "Error creating expense", error });
  }
};

const getExpense = async (req: CustomRequest, res: Response) => {
  try {
    const result = await expenseService.getExpense(req.params.id);
    res
      .status(200)
      .json({ data: result, msg: "Expense retrieved successfully" });
  } catch (error) {
    logger.error("Error retrieving expense:", error);
    res.status(500).json({ msg: "Error fetching expense", error });
  }
};

const getExpenseList = async (req: CustomRequest, res: Response) => {
  try {
    const result = await expenseService.getExpenseList(req.params.groupId);
    res
      .status(200)
      .json({ data: result, msg: "Expense list retrieved successfully" });
  } catch (error) {
    logger.error("Error retrieving expense list:", error);
    res.status(500).json({ msg: "Error fetching expense list", error });
  }
};

const updateExpense = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req?.user?._id as string;
    const result = await expenseService.updateExpense(
      req.params.id,
      req.body,
      req.params.groupId,
      userId
    );
    res.status(200).json({ data: result, msg: "Expense updated successfully" });
  } catch (error) {
    logger.error("Error updating expense:", error);
    res.status(500).json({ msg: "Error updating expense", error });
  }
};

const deleteExpense = async (req: CustomRequest, res: Response) => {
  try {
    const result = await expenseService.deleteExpense(
      req.params.id,
      req.params.groupId,
      req.user?._id as string
    );
    res.status(200).json({ data: result, msg: "Expense deleted successfully" });
  } catch (error) {
    logger.error("Error deleting expense:", error);
    res.status(500).json({ msg: "Error deleting expense", error });
  }
};

export const expenseController = {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseList,
};
