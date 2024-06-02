import { ACCEPTED_STATUS, CHANNEL_ROLE } from "../constants.js";
import { findUserById } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/authUtils.js";

export const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "your not authenticated, token not found");
  }
  const decodedToken = verifyAccessToken(token);
  if (!decodedToken) {
    throw new ApiError(401, "your not authenticated, Invalid token or expired ");
  }
  const user = await findUserById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "your not authenticated, user not found Invalid token or expired ");
  }
  req.user = user;
  next();
});

// middleware to check if user is an authorized news channel before allowing article publication
export const isNewsChannel = asyncHandler(async (req, res, next) => {
  const user = req.user;
  // when user account is channel and also admin approved his channel
  if (user.role === CHANNEL_ROLE && user.channelApprovalStatus === ACCEPTED_STATUS) {
    req.author = user;
    return next();
  }
  throw new ApiError(401, "your not authorized to publish anything here");
});
