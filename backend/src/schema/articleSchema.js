import Joi from "joi";

export const publishArticleSchema = Joi.object({
  title: Joi.string().min(10).max(50).required().messages({
    "string.base": `title should be a type of text`,
    "string.empty": `title cannot be an empty field`,
    "any.required": `title is a required field`,
    "string.min": `title must have at least 10 characters`,
    "string.max": `title must less then 50 characters`,
  }),
  markdownContent: Joi.required().messages({
    "string.empty": `markdown cannot be an empty field`,
    "any.required": `markdown is a required field`,
  }),
});
