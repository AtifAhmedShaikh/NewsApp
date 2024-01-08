import { comparePassword, hashedPassword } from "../utils/helper.js";
import UserModel from "../models/User.model.js";

export const findUsers = async () => {
    return await UserModel.find();
};
export const findUserById = async userId => {
    return await UserModel.findById(userId);
};

//register new user in database
export const createNewUser = async userData => {
    const hashed = await hashedPassword(userData.password);
    const newUser = new UserModel({
        ...userData,
        password: hashed,
        role: "USER"
    });
    return await newUser.save();
};
//register new channel account and Ensure admin accept his request for account creating
export const createNewChannel = async channelData => {
    const hashed = await hashedPassword(channelData.password);
    const newUser = new UserModel({
        ...channelData,
        password: hashed,
        role: "NEWS_CHANNEL",
        approvalStatus:"PENDING"
    });
    return await newUser.save();
};

export const findUserByEmail = async email => {
    return await UserModel.findOne({ email });
};

export const findUserByEmailAndPassword = async (email, password) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return null;
    const isMatchedPassword = await comparePassword(password, user.password);
    if (!isMatchedPassword) return null;
    return user;
};
