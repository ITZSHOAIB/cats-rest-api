import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import bcrypt from "bcryptjs";
import { IUserAddedRequest } from "../middlewares/auth";

const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  if (user) {
    return res.status(409).send("User Already Exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userService.saveUser({ email, password: hashedPassword });
  res.status(201).send("The user has been registered successfully.");
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Unauthorized");
  }

  const token = authService.createAccessToken(user);
  const options = {
    expires: token.expiresIn,
    hhtpOnly: true,
  };

  res
    .status(200)
    .cookie("token", token.token, options)
    .json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
});

const logout = catchAsync(async (req: IUserAddedRequest, res: Response) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).send("Logged out successfully");
});

export default {
  register,
  login,
  logout,
};
