import userModel from "../models/user.model";
import { IUser } from "../types/user";

const saveUserDetails = async (userDetails: Partial<IUser>) => {
  const user = await userModel.create(userDetails);
  return await user.save();
};

const getUserDetails = async (email: string) => {
  return await userModel.findOne({ email: email });
};

const updateUserDetails = async (userDetails: Partial<IUser>) => {
  return await userModel.updateOne(
    {
      _id: userDetails._id,
    },
    {
      $set: userDetails,
    }
  );
};

const getUserProfile = async (userId: string) => {
  return await userModel.findOne({ _id: userId }, { password: 0 });
};

export const userService = {
  saveUserDetails,
  getUserDetails,
  updateUserDetails,
  getUserProfile,
};
