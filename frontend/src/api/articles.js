import api from "../config/apiConfig";
import { asyncHandler } from "../utils/asyncHandler";
// "@reduxjs/toolkit": "^2.0.1",
// "axios": "^1.6.2",
// "firebase": "^10.7.1",
// "framer-motion": "^10.17.4",
// "react": "^18.2.0",
// "react-dom": "^18.2.0",
// "react-helmet": "^6.1.0",
// "react-hook-form": "^7.49.2",
// "react-icons": "^4.12.0",
// "react-redux": "^9.0.2",
// "react-reveal": "^1.2.2",
// "react-router-dom": "^6.20.1",
// "react-share": "^5.0.3",
// "react-toastify": "^9.1.3",
// "sweetalert2": "^11.10.2"
export const fetchArticles = async () => {
  const response = await asyncHandler(async () => {
    return await api.get("/api/v1/articles");
  });
  return response;
};

export const fetchArticleById = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.get(`/api/v1/articles/one/${articleId}`);
  });
  return response;
};

export const createArticleByChannel = async (articleData) => {
  const response = await asyncHandler(async () => {
    return await api.post("/api/v1/articles/create", articleData);
  });
  return response;
};

export const updateArticleByChannel = async (updatedArticle) => {
  const response = await asyncHandler(async () => {
    return await api.put(`/api/v1/articles/update/${updatedArticle._id}`, {
      updatedArticle,
    });
  });
  return response;
};
//Like article by Id
export const likeArticleById = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.patch(`/api/v1/articles/like/${articleId}`);
  });
  return response;
};
//Dislike article by Id
export const disLikeArticleById = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.patch(`/api/v1/articles/dislike/${articleId}`);
  });
  return response;
};

export const deleteArticleById = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.delete(`/api/v1/articles/delete/${articleId}`);
  });
  return response;
};
//fetch user collection which contains all saved articles of user
export const fetchUserCollection = async (userId) => {
  const response = await asyncHandler(async () => {
    return await api.get(`/api/v1/collections/collection/${userId}`);
  });
  return response;
};

//add article into user collection
export const addToCollection = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.post(`/api/v1/collections/collection/add/${articleId}`);
  });
  return response;
};

//remove article from user collection
export const removeToCollection = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.delete(`/api/v1/collections/collection/remove/${articleId}`);
  });
  return response;
};

export const fetchCommentsById = async (articleId) => {
  const response = await asyncHandler(async () => {
    return await api.get(`/api/v1/articles/comments/articles/${articleId}`);
  });
  return response;
};

export const addCommentOnArticle = async (articleId, commentText) => {
  const response = await asyncHandler(async () => {
    return await api.post("/api/v1/articles/comments/add", {
      articleId,
      commentText,
    });
  });
  return response;
};

export const fetchArticleByQuery = async (query) => {
  const response = await asyncHandler(async () => {
    return await api.get(`/api/v1/articles/all?query=${query}`);
  });
  return response;
};
