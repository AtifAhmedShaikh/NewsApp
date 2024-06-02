import express from "express";
import { authenticateUser, isNewsChannel } from "../middlewares/auth.middleware.js";
import {
  getArticlesFeed,
  getArticleBySlug,
  publishArticle,
  updatedArticleById,
  deleteArticleById,
} from "../controllers/articles.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getArticlesFeed);

router.route("/article-slug/:slug").get(getArticleBySlug);

router.route("/publish-article").post(isNewsChannel, publishArticle);

router.route("/update-article/:id").put(isNewsChannel, updatedArticleById);

router.route("/delete-article/:id").delete(isNewsChannel, deleteArticleById);

export default router;
