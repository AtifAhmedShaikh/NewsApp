import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import articlesRouter from "./routes/articles.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import channelRouter from "./routes/channel.route.js";
import collectionRouter from "./routes/collection.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { corsOptions } from "./config/options.js";
import { sendEmail } from "./utils/nodemailer.js";
import UserModel from "./models/User.model.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declare Index route of app
app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to NewsApp server " });
});

// declare routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/articles", articlesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/collections", collectionRouter);

app.get("/send-email", async (req, res) => {
  const data = await UserModel.findOneAndUpdate(
    { _id: "665c4fdd2e29c0c04cc02702" },
    { channelApprovalStatus: "ACCEPTED" },
  );
  res.status(200).json({ data });
  // await sendEmail({
  //   sendTo: "user.email",
  //   subject: "Account Verification Email",
  //   template: "verificationEmail",
  //   context: { email: "user.email", username: "user.username", verificationPageURL: "----" },
  // });
});

// handle 404 not found routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found ",
  });
});

// apply global error handler
app.use(errorHandler);

export default app;
