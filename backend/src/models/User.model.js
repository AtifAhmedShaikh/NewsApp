import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import { assignAccessToken, assignRefreshToken } from "../utils/authUtils.js";
import { ACCEPTED_STATUS, ADMIN_ROLE, CHANNEL_ROLE, PENDING_STATUS, REJECTED_STATUS, USER_ROLE } from "../constants.js";
import { generateToken } from "../utils/helper.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [5, "Name at least should be Greater then 5 characters "],
      maxLength: [15, "Name must be less then 15 characters "],
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      lowerCase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String, //url from cloudinary service
      default: "myImage",
    },
    coverImage: {
      type: String, //url from cloudinary service
      default: "myImage",
    },
    role: {
      type: String,
      enum: [USER_ROLE, CHANNEL_ROLE, ADMIN_ROLE],
      default: "USER",
    },
    about: {
      type: String,
      default: "Hey, i am using newsApp",
    },
    headline: {
      type: String,
      default: "Frontend Developer | React Developers",
    },
    channelApprovalStatus: {
      type: String,
      enum: [ACCEPTED_STATUS, REJECTED_STATUS, PENDING_STATUS],
      default: PENDING_STATUS,
    },
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],

    verified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationExpire: Date,
  },
  { timestamps: true },
);

// encrypt user password before saving the document in database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// handle duplicate key error
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]; // Get the field causing the error
    const value = error.keyValue[field]; // Get the value causing the error
    throw new ApiError(409, `${field} ${value} already exists`);
  }
  next(error);
});

// middleware to ensure only verified users are fetched every Database query
userSchema.pre(["find", "findOne"], function (next) {
  const isFetchingByVerificationToken = Object.keys(this.getQuery()).includes("verificationToken");
  if (isFetchingByVerificationToken) return next();
  this.where({ verified: true });
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate access and refresh token using JWT and refresh token save in user document
userSchema.methods.getJwtTokens = async function () {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  const accessToken = assignAccessToken(payload);
  const refreshToken = assignRefreshToken(payload);

  this.refreshToken = refreshToken;
  await this.save();

  return { accessToken, refreshToken };
};

userSchema.methods.generateResetPasswordToken = async function () {
  const token = generateToken();
  this.resetPasswordToken = token;
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  await this.save();
  console.log("reset password token", this.resetPasswordToken, this.resetPasswordExpire);
  return token;
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
