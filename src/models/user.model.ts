import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export type UserDocument = mongoose.Document & IUser;

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export const User = mongoose.model<UserDocument>("User", userSchema);
