import { Response } from "express";
import { groupService } from "../services/group.service";
import { CustomRequest } from "../types/express";
import { logger } from "../utils/logger";

const createGroup = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Creating group with data:", req.body);
    const userId = req?.user?._id as string;
    const result = await groupService.createGroup(req.body, userId);
    res.status(200).json({ data: result, msg: "Group created successfully" });
  } catch (error) {
    logger.error("Error creating group:", error);
    res.status(500).json({ msg: "Error creating group", error });
  }
};

const getGroupDetails = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Fetching group details for ID:", req.params.id);
    const groupId = req.params.id;
    const result = await groupService.getGroupDetails(groupId);
    res.status(200).json({ data: result, msg: "Group retrieved successfully" });
  } catch (error) {
    logger.error("Error fetching group details:", error);
    res.status(500).json({ msg: "Error fetching group details", error });
  }
};

const updateGroupDetails = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Updating group details for ID:", req.params.id);
    const groupId = req.params.id;
    const groupDetails = req.body;
    const result = await groupService.updateGroupDetails(groupId, groupDetails);
    res.status(200).json({ data: result, msg: "Group updated successfully" });
  } catch (error) {
    logger.error("Error updating group details:", error);
    res.status(500).json({ msg: "Error updating group details", error });
  }
};

const getGroupList = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Fetching group list for user ID:", req?.user?._id);
    console.log("🚀 -------------🚀");
    console.log("🚀 ~ req:", req.query);
    console.log("🚀 -------------🚀");
    const userId = req?.user?._id as string;
    const { pageNo, pageSize, sortBy, sortOrder } = req.query;
    const result = await groupService.getGroupList(
      userId,
      pageNo as unknown as number,
      pageSize as unknown as number,
      sortBy as string,
      sortOrder as "asc" | "desc" | undefined
    );
    res
      .status(200)
      .json({ data: result, msg: "Group list retrieved successfully" });
  } catch (error) {
    logger.error("Error fetching group list:", error);
    res.status(500).json({ msg: "Error fetching group list", error });
  }
};

const getAllGroups = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Fetching all groups");
    logger.debug("Query parameters:", req.query);
    const { pageNo, pageSize, sortBy, sortOrder } = req.query;
    const result = await groupService.getAllGroups(
      pageNo as unknown as number,
      pageSize as unknown as number,
      sortBy as string,
      sortOrder as "asc" | "desc" | undefined
    );
    res
      .status(200)
      .json({ data: result, msg: "All groups retrieved successfully" });
  } catch (error) {
    logger.error("Error fetching all groups:", error);
    res.status(500).json({ msg: "Error fetching all groups", error });
  }
};

const deleteGroup = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Deleting group with ID:", req.params.id);
    const groupId = req.params.id;
    const result = await groupService.deleteGroup(groupId);
    res.status(200).json({ data: result, msg: "Group deleted successfully" });
  } catch (error) {
    logger.error("Error deleting group:", error);
    res.status(500).json({ msg: "Error deleting group", error });
  }
};

const addMemberToGroup = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Adding member to group with ID:", req.params.id);
    logger.debug("Member ID:", req.body.userId);
    const groupId = req.params.id;
    const memberId = req.body.userId;
    const result = await groupService.addMemberToGroup(groupId, memberId);
    res.status(200).json({ data: result, msg: "Member added successfully" });
  } catch (error) {
    logger.error("Error adding member to group:", error);
    res.status(500).json({ msg: "Error adding member to group", error });
  }
};

const removeMemberFromGroup = async (req: CustomRequest, res: Response) => {
  try {
    logger.info("Removing member from group with ID:", req.params.id);
    logger.debug("Member ID:", req.body.userId);
    const groupId = req.params.id;
    const memberId = req.body.userId;
    const result = await groupService.removeMemberFromGroup(groupId, memberId);
    res.status(200).json({ data: result, msg: "Member removed successfully" });
  } catch (error) {
    logger.error("Error removing member from group:", error);
    res.status(500).json({ msg: "Error removing member from group", error });
  }
};

export const groupController = {
  createGroup,
  getGroupDetails,
  updateGroupDetails,
  getGroupList,
  getAllGroups,
  deleteGroup,
  addMemberToGroup,
  removeMemberFromGroup,
};
