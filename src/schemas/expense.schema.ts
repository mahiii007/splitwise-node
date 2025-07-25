import { z } from "zod";
export const createExpenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .min(0, "Amount must be at least 0"),
  currency: z.string().default("INR").optional(),
  payerId: z.string(),
  split: z
    .array(
      z.object({
        userId: z.string(),
        amount: z.number().positive("Split amount must be positive"),
        percentage: z
          .number()
          .min(0)
          .max(100, "Percentage must be between 0 and 100"),
        isPaid: z.boolean().default(false),
        paidAt: z.date().optional(),
      })
    )
    .optional(),
  notes: z.string().optional(),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
});

export const updateExpenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .min(0, "Amount must be at least 0")
    .optional(),
  currency: z.string().default("INR").optional(),
  payerId: z.string().optional(),
  split: z
    .array(
      z.object({
        userId: z.string(),
        amount: z.number().positive("Split amount must be positive"),
        percentage: z
          .number()
          .min(0)
          .max(100, "Percentage must be between 0 and 100"),
        isPaid: z.boolean().default(false),
        paidAt: z.date().optional(),
      })
    )
    .optional(),
  notes: z.string().optional(),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
});
export const groupIdParamSchema = z.object({
  groupId: z.string(),
});

export const getExpenseListSchema = z.object({
  pageNo: z.string().optional().or(z.number().int().min(1)).optional(),
  pageSize: z.string().optional().or(z.number().int().min(1)).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const expenseIdParamSchema = z.object({
  id: z.string(),
});
export const groupAndUserIdParamSchema = z.object({
  // userId: z.string(),
  groupId: z.string(),
});
export type createExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
export type GroupIdParam = z.infer<typeof groupIdParamSchema>;
export type ExpenseIdParam = z.infer<typeof expenseIdParamSchema>;
export type getExpenseListInput = z.infer<typeof getExpenseListSchema>;
export type GroupAndUserIdParam = z.infer<typeof groupAndUserIdParamSchema>;
