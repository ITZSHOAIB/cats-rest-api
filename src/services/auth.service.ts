import jwt from "jwt-simple";
import { addMinutes, getUnixTime } from "date-fns";
import { UserDocument } from "../models/user.model";

const createAccessToken = (user: UserDocument) => {
  const expiration = +(process.env.JWT_EXPIRATION_INTERVAL || 15);
  const payload = {
    exp: getUnixTime(addMinutes(Date.now(), expiration)),
    iat: getUnixTime(Date.now()),
    id: user._id,
  };

  const secret = process.env.JWT_SECRET || "CATS_REST_JWT";
  const token = jwt.encode(payload, secret);

  return {
    tokenType: "Bearer",
    expiresIn: addMinutes(Date.now(), expiration),
    token,
  };
};

export default {
  createAccessToken,
};
