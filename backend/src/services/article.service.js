import { Query } from "mongoose";
import ArticleModel from "../models/Article.model.js";
import CommentModel from "../models/Comment.model.js";

export const findArticles = async () => {
  return await ArticleModel.find({}).populate("author");
};

export const findArticleById = async id => {
  return await ArticleModel.findById(id).populate("author");
};

export const findArticle = async query => {
  return await ArticleModel.findOne(query).populate("author");
};

export const findArticleAndUpdate = async (query, updatedInfo) => {
  return await ArticleModel.findOneAndUpdate(query, updatedInfo, { new: true }).populate("author");
};

export const findArticleAndDelete = async query => {
  return await ArticleModel.findOneAndDelete(query);
};

export const findArticlesByQuery = async query => {
  const regex = new RegExp(query, "i");
  const articles = await ArticleModel.find({
    $or: [
      { title: { $regex: regex } },
      { content: { $regex: regex } },
      { description: { $regex: regex } },
      // Add more fields as needed
    ],
  });

  return articles;
};

export const createArticle = async articleData => {
  return await ArticleModel.create(articleData);
};

export const updateArticleById = async (id, updated) => {
  return await ArticleModel.findByIdAndUpdate(id, updated);
};

export const deleteArticleById = async id => {
  return await ArticleModel.findByIdAndDelete(id);
};

export const likeTheArticleByUser = async (articleId, userId) => {
  const article = await findArticleById(articleId);
  article.likes = [...article.likes, userId];
  return await article.save();
};

export const disLikeTheArticleByUser = async (articleId, userId) => {
  const article = await findArticleById(articleId);
  article.likes = [...article.likes].filter(like => like != userId);
  return await article.save();
};

export const findChannelArticles = async channelId => {
  return await ArticleModel.find({ author: channelId });
};

export const isArticleLikedByUser = async (articleId, userId) => {
  const article = await findArticleById(articleId);
  return article.likes.includes(userId);
};

export const findArticleCommentsById = async articleId => {
  return await CommentModel.find({ articleId }).populate("userId");
};

export const addCommentOnArticle = async newComment => {
  return await CommentModel.create({
    ...newComment,
  });
};
