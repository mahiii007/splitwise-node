import { IUser } from "../types/user";
import { userService } from "./user.service";
import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const signUpUser = async (userDetails: Partial<IUser>) => {
  const password = await hash(userDetails.password as string, 10);
  userDetails.password = password;
  const user = await userService.saveUserDetails(userDetails);
  const token = sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    token,
  };
};

const logInUser = async (userDetails: Partial<IUser>) => {
  const user = await userService.getUserDetails(userDetails.email as string);
  if (!user) {
    throw new Error("User does not exists !!!!!!!!");
  }

  const isMatched = await compare(
    userDetails.password as string,
    user.password
  );
  if (!isMatched) {
    throw new Error("Password is not matching !!!!!!!!");
  }

  const token = sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );
  return { _id: user._id, email: user.email, name: user.name, token };

  // userDetails.password = password
  // const user = await userService.saveUserDetails(userDetails);
  // const token = sign({
  //     _id: user._id,
  //     email: user.email,
  //     name: user.name,
  //     phone: user.phone,
  //     role: user.role
  // }, process.env.SECRET_KEY as string, {
  //     expiresIn : "24h",

  // })
  // return {...user, token}
};

export const authService = { signUpUser, logInUser };
