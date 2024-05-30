// src/components/PublishArticle.js

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const PublishArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, content };
    console.log("Article submitted:", article);
    // Here you can add the code to send the article to the server
  };

  return (
    <div className="max-w-4xl mx-aut o rounded-lg shadow-md bg-background">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="w-full p-2 border border-gray-300 bg-background text-foreground rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-lg font-medium mb-2">
            Content:
          </label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={PublishArticle.modules}
            formats={PublishArticle.formats}
            placeholder="Write your article..."
            className="h-[45vh] mb-2"
          />
        </div>
        <button
          type="submit"
          className="w-fit sm:mt-10 p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

PublishArticle.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

PublishArticle.formats = [
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

export default PublishArticle;
