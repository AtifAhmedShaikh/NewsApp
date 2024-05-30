import React, { useState } from "react";
import ReactQuill from "react-quill";
import slug from "slug";
import { HTMLToJSON, JSONToHTML } from "html-to-json-parser"; // ES6
import { Button } from "../UI/button";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { capitalizeWords } from "../../utils/helper";
import { postRequest } from "../../api/apiServices";

const PublishArticleForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const convertedMartdown = await HTMLToJSON(content, true);
    const articleData = { title: title.toLowerCase(), content: convertedMartdown };
    console.log("Article submitted:", articleData);
    const response = await postRequest("/api/v1/articles/publish-article", articleData);
    setLoading(false);
    if (!response.success) return setErrorMessage(response.message);
    setTitle("");
    setContent("");
    setErrorMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-md bg-background">
      <div className="my-5">
        <p className="text-red-500">{errorMessage}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            minLength={10}
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 bg-background text-foreground rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-lg font-medium mb-2">
            Content:
          </label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={PublishArticleForm.modules}
            formats={PublishArticleForm.formats}
            placeholder="Write your article..."
            className="h-[45vh] mb-2"
          />
        </div>
        <Button type="submit" className="w-fit sm:mt-10" loading={loading}>
          Publish
        </Button>
      </form>
    </div>
  );
};

PublishArticleForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

PublishArticleForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

export default PublishArticleForm;
