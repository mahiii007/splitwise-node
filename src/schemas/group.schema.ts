import { z } from "zod";
import { GroupType } from "../types/group";
export const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  type: z.enum(Object.values(GroupType) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid group type" }),
  }),
  groupPictureUrl: z.string().url().optional(),
  groupCoverPicUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  members: z
    .array(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .optional(),
});

export const updateGroupSchema = z.object({
  name: z.string().min(1, "Group name is required").optional(),
  description: z.string().optional(),
  type: z
    .enum(["Apartment", "House", "Trip", "Other"], {
      errorMap: () => ({ message: "Invalid group type" }),
    })
    .optional(),
  groupPictureUrl: z.string().url().optional(),
  groupCoverPicUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  members: z
    .array(
      z.object({
        userId: z.string(),
      })
    )
    .optional(),
});
export const groupIdParamSchema = z.object({
  id: z.string(),
});

export const addMemberParamSchema = z.array(z.string());

export const getGroupListSchema = z.object({
  pageNo: z.string().optional().or(z.number().int().min(1)).optional(),
  pageSize: z.string().optional().or(z.number().int().min(1)).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const userIdParamSchema = z.object({
  userId: z.string(),
});
export type createGroupInput = z.infer<typeof createGroupSchema>;
export type GroupIdParam = z.infer<typeof groupIdParamSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
export type GetGroupListInput = z.infer<typeof getGroupListSchema>;
