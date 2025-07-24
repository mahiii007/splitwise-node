import { Router } from "express";
import { groupController } from "../controllers/group.controller";
import { validateRequest } from "../middleware/validateRequest";
import {
  createGroupSchema,
  groupIdParamSchema,
  updateGroupSchema,
  getGroupListSchema,
} from "../schemas/group.schema";
const router = Router();

router.post(
  "/create",
  validateRequest({ body: createGroupSchema }),
  groupController.createGroup
);
router.get(
  "/:id",
  validateRequest({ params: groupIdParamSchema }),
  groupController.getGroupDetails
);
router.put(
  "/:id",
  validateRequest({ params: groupIdParamSchema }),
  validateRequest({ body: updateGroupSchema }),
  groupController.updateGroupDetails
);
router.get(
  "/involved/list",
  validateRequest({ query: getGroupListSchema }),
  groupController.getGroupList
);
router.get("/involved/all", groupController.getAllGroups);
router.delete(
  "/:id",
  validateRequest({ params: groupIdParamSchema }),
  groupController.deleteGroup
);
router.post(
  "/:id/addmembers",
  validateRequest({ params: groupIdParamSchema }),
  groupController.addMemberToGroup
);
router.post(
  "/:id/removeMembers",
  validateRequest({ params: groupIdParamSchema }),
  groupController.removeMemberFromGroup
);

export { router as groupRouter };
