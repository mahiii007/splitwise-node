import { z } from "zod";

export const fetchActivitySchema = z.object({
  relatedGroupId: z.string().optional(),
  relatedExpenseId: z.string().optional(),
  userId: z.string().optional(),
  pageNo: z.string().optional().or(z.number().int().min(1)).optional(),
  pageSize: z.string().optional().or(z.number().int().min(1)).optional(),
  sortBy: z.enum(["createdAt", "updatedAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type FetchActivityInput = z.infer<typeof fetchActivitySchema>;
