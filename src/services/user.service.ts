import { IUser, User, UserDocument } from "../models/user.model";

const saveUser = async ({ email, password }: IUser): Promise<UserDocument> => {
  const user = new User({
    email,
    password,
  });
  await user.save();
  return user;
};

const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
  const user = await User.findOne({ email });
  return user;
};

export default {
  saveUser,
  getUserByEmail,
};
