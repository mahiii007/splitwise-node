// src/models/Group.ts
import { Schema, model } from "mongoose";
import {
  IGroup,
  IGroupMember,
  GroupType,
  GroupMemberRole,
} from "../types/group";

const GroupMemberSchema = new Schema<IGroupMember>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    joinedAt: { type: Date, required: true, default: Date.now },
    role: {
      type: String,
      enum: Object.values(GroupMemberRole),
      default: GroupMemberRole.MEMBER,
    },
  },
  { _id: false }
);

const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: Object.values(GroupType), required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: { type: [GroupMemberSchema], default: [] },
    groupPictureUrl: { type: String },
    groupCoverPicUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default model<IGroup>("Group", GroupSchema);
