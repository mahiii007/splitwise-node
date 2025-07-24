import groupModel from "../models/group.model";
import { GroupMemberRole, IGroup } from "../types/group";
import mongoose from "mongoose";

const createGroup = async (groupDetails: Partial<IGroup>, userId: string) => {
  try {
    // Add the creator as the first member and admin of the group
    groupDetails.admin = new mongoose.Types.ObjectId(userId);
    groupDetails.members = groupDetails.members || [];
    groupDetails.members.push({
      userId: new mongoose.Types.ObjectId(userId),
      role: GroupMemberRole.ADMIN,
      joinedAt: new Date(),
    });
    const group = await groupModel.create(groupDetails);
    return group;
  } catch (error) {
    throw error;
  }
};

const getGroupDetails = async (groupId: string) => {
  try {
    const group = await groupModel.findById(groupId);
    return group;
  } catch (error) {
    throw error;
  }
};

const updateGroupDetails = async (
  groupId: string,
  groupDetails: Partial<IGroup>
) => {
  try {
    const group = await groupModel.findByIdAndUpdate(groupId, groupDetails, {
      new: true,
    });
    return group;
  } catch (error) {
    throw error;
  }
};

const getGroupList = async (
  userId: string,
  pageNo: number = 1,
  pageSize: number = 10,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "desc"
) => {
  try {
    let sortOptions = {};
    if (sortBy) {
      sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    } else {
      sortOptions = { createdAt: -1 }; // Default sort by creation date
    }
    const groups = await groupModel
      .find({ "members.userId": new mongoose.Types.ObjectId(userId) })
      .sort(sortOptions)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize);
    return groups;
  } catch (error) {
    throw error;
  }
};

const getAllGroups = async (
  pageNo: number = 1,
  pageSize: number = 10,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "desc"
) => {
  try {
    let sortOptions = {};
    if (sortBy) {
      sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    } else {
      sortOptions = { createdAt: -1 }; // Default sort by creation date
    }
    const groups = await groupModel
      .find()
      .sort(sortOptions)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize);
    return groups;
  } catch (error) {
    throw error;
  }
};

const deleteGroup = async (groupId: string) => {
  try {
    const group = await groupModel.findByIdAndDelete(groupId);
    return group;
  } catch (error) {
    throw error;
  }
};

const addMemberToGroup = async (groupId: string, userId: string) => {
  try {
    const result = await groupModel.findByIdAndUpdate(
      groupId,
      {
        $addToSet: {
          members: {
            userId: new mongoose.Types.ObjectId(userId),
            role: GroupMemberRole.MEMBER,
            joinedAt: new Date(),
          },
        },
      },
      { new: true }
    );
    if (!result) {
      throw new Error("Group not found");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const removeMemberFromGroup = async (groupId: string, userId: string) => {
  try {
    const result = await groupModel.findByIdAndUpdate(
      groupId,
      { $pull: { members: { userId: new mongoose.Types.ObjectId(userId) } } },
      { new: true }
    );
    if (!result) {
      throw new Error("Group not found");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const groupService = {
  createGroup,
  getGroupDetails,
  updateGroupDetails,
  getGroupList,
  getAllGroups,
  deleteGroup,
  addMemberToGroup,
  removeMemberFromGroup,
};
