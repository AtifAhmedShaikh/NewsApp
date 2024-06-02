import { asyncHandler } from "../utils/asyncHandler.js";
import {
  disLikeTheArticleByUser,
  findArticleById,
  findArticles,
  likeTheArticleByUser,
  updateArticleById,
  createArticle,
  findArticleCommentsById,
  addCommentOnArticle,
  findArticlesByQuery,
  findArticle,
  findArticleAndUpdate,
  findArticleAndDelete,
} from "../services/article.service.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { validateSchema } from "../utils/validationHelper.js";
import { publishArticleSchema } from "../schema/articleSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

export const publishArticle = asyncHandler(async (req, res) => {
  const validatedFields = validateSchema(publishArticleSchema, req.body);
  const { title, markdownContent } = validatedFields;
  const authorId = req.author?._id;
  const createdArticle = await createArticle({ title, markdownContent, author: authorId });
  if (!createdArticle) {
    throw new ApiError(500, "Error while Creating Article on database");
  }
  new ApiResponse(201, { createdArticle }, "Article has published successfully").send(res);
});

export const getArticlesFeed = asyncHandler(async (req, res) => {
  const articles = await findArticles();
  if (!articles?.length) {
    throw new ApiError(500, "Error while fetching articles feed from database");
  }
  new ApiResponse(200, { articles }, "Articles Feed fetched successfully").send(res);
});

export const getArticleBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const article = await findArticle({ slug });
  new ApiResponse(200, { article }, "Articles by slug fetched successfully").send(res);
});

export const updatedArticleById = asyncHandler(async (req, res) => {
  const articleId = req.params?.id;
  const authorId = req.author?._id;
  if (!isValidObjectId(articleId)) {
    throw new ApiError(400, "please give valid article ID");
  }
  const validatedFields = validateSchema(publishArticleSchema, req.body);
  const { title, markdownContent } = validatedFields;

  const articleToUpdate = await findArticle({ _id: articleId });
  if (!articleToUpdate) {
    throw new ApiError(404, "article not found Invalid ID");
  }
  console.log(articleToUpdate.author?._id);
  // check is author has authorized to modify article
  if (String(articleToUpdate.author?._id) !== String(authorId)) {
    throw new ApiError(404, "your not authorized to modify this article");
  }
  // update article
  articleToUpdate.title = title;
  articleToUpdate.markdownContent = markdownContent;
  const updatedInfo = await articleToUpdate.save();
  if (!updatedInfo) {
    throw new ApiError(404, "Error while saving updated article info in dabatase");
  }
  new ApiResponse(200, { articleToUpdate }, "Article has updated successfully").send(res);
});

export const deleteArticleById = asyncHandler(async (req, res) => {
  const articleId = req.params?.id;
  const authorId = req.author?._id;
  if (!isValidObjectId(articleId)) {
    throw new ApiError(400, "please give valid article ID");
  }

  const articleToDelete = await findArticle({ _id: articleId });
  if (!articleToDelete) {
    throw new ApiError(404, "article not found Invalid ID");
  }

  // check is author has authorized to delete article
  if (String(articleToDelete.author?._id) !== String(authorId)) {
    throw new ApiError(404, "your not authorized to delete this article");
  }
  const deletedArticle = await findArticleAndDelete({ _id: articleId });
  // check is author has authorized to delete article
  if (!deletedArticle) {
    throw new ApiError(404, "Error while deleting article form database");
  }
  new ApiResponse(200, {}, "Article has been deleted successfully").send(res);
});

export const likeArticleById = asyncHandler(async (req, res) => {
  const { id: articleId } = req.params;
  const { _id: userId } = req.user;
  await likeTheArticleByUser(articleId, userId);
  res.status(200).json({ message: "your liked the article " });
});

export const disLikeArticleById = asyncHandler(async (req, res) => {
  const { id: articleId } = req.params;
  const { _id: userId } = req.user;
  await disLikeTheArticleByUser(articleId, userId);
  res.status(200).json({ message: "you dislike the article" });
});

//fetch all comments of specific article by Id
export const fetchArticleComments = asyncHandler(async (req, res) => {
  const { id: articleId } = req.params;
  const comments = await findArticleCommentsById(articleId);
  res.status(200).json({ comments });
});

//add new comment on specific article
export const addComment = asyncHandler(async (req, res) => {
  const { articleId, commentText } = req.body;
  const { _id: userId } = req.user;
  const createdComment = await addCommentOnArticle({
    articleId,
    commentText,
    userId,
  });
  res.status(200).json({
    comment: createdComment,
    message: "comment added successfully ",
  });
});
