import mongoose from "mongoose";
import slug from "slug";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    markdownContent: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  { timestamps: true },
);

// Generate slug from title
articleSchema.pre("save", function (next) {
  this.slug = slug(this.title?.toLowerCase());
  next();
});

const ArticleModel = mongoose.model("article", articleSchema);

export default ArticleModel;
