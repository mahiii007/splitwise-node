// src/types/group.ts
import { Types } from "mongoose";

export enum GroupType {
  APARTMENT = "Apartment",
  HOUSE = "House",
  TRIP = "Trip",
  OTHER = "Other",
}

export enum GroupMemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

// src/types/group.ts (continued)
export interface IGroupMember {
  userId: Types.ObjectId;
  joinedAt: Date;
  role: GroupMemberRole;
}

// src/types/group.ts (continued)
export interface IGroup {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  type: GroupType;
  admin: Types.ObjectId;
  members: IGroupMember[];
  groupPictureUrl: string;
  groupCoverPicUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}
