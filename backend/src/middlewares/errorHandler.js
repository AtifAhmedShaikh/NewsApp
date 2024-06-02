import { MODE } from "../config/envManager.js";

export const errorHandler = (err, req, res, next) => {
  console.log("Error has detected in error handler middleware !");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong Please try again";

  if (MODE !== "PRODUCTION") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};
