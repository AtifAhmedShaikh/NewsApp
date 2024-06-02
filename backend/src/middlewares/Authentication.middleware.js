import { findUserById } from "../services/user.service.js";
import { verifyUserToken } from "../utils/helper.js";

//middleware for check user has authenticated, Include user data in request
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "your are not authenticated !",
      });
    }
    const verified = verifyUserToken(token);
    if (!verified) {
      return res.status(404).json({
        message: "user not found !",
      });
    }
    const user = await findUserById(verified._id);
    req.user = user;
    next();
  } catch (error) {
    console.log("error in token of middleware !");
  }
};

//middleware of check is current user role is news channel or not,Include user in request as a author
export const isNewsChannel = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "NEWS_CHANNEL") {
      req.author = req.user;
      return next();
    } else {
      res.status(401).json({
        message: "your are not able to write  article, only channel can be allow ",
      });
    }
  } catch (error) {
    console.log("error in token of middleware !");
  }
};

//middleware of check admin role
export const isAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role !== "ADMIN") {
    return res.status(401).json({
      message: "your not authorized admin !",
    });
  }
  next();
};
