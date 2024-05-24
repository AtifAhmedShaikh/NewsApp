import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/authUtils.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers["Authorization"]?.replace("berear ", "");
  if (!token) {
    throw new ApiError(401, "your not authenticated, token not found");
  }
  const decodedToken = verifyAccessToken(token);
  if (!decodedToken) {
    throw new ApiError(401, "your not authenticated, Invalid token or expired ");
  }
  const user = await findUserById(verified._id);
  if (!user) {
    throw new ApiError(401, "your not authenticated, user not found Invalid token or expired ");
  }
  req.user = user;
  next();
};