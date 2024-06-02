import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { HTMLToJSON, JSONToHTML } from "html-to-json-parser"; // ES6
import { Button } from "../UI/button";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { capitalizeWords } from "../../utils/helper";
import { getRequest, postRequest } from "../../api/apiServices";
import { useParams } from "react-router-dom";

const UpdateArticleForm = () => {
  const { articleId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const response = await getRequest(`/api/v1/articles/${articleId}`);
      setLoading(false);
      if (!response.success) return setErrorMessage(response.message);
      setTitle(response.data.title);
      setContent(await JSONToHTML(response.data.content));
    };
    fetchArticle();
  }, [articleId]);

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
    const convertedMarkdown = await HTMLToJSON(content, true);
    const articleData = { title: title.toLowerCase(), content: convertedMarkdown };
    console.log("Article updated:", articleData);
    const response = await postRequest(`/api/v1/articles/update-article/${articleId}`, articleData);
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
            modules={UpdateArticleForm.modules}
            formats={UpdateArticleForm.formats}
            placeholder="Update your article..."
            className="h-[45vh] mb-2"
          />
        </div>
        <Button type="submit" className="w-fit sm:mt-10" loading={loading}>
          Update
        </Button>
      </form>
    </div>
  );
};

UpdateArticleForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

UpdateArticleForm.formats = [
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

export default UpdateArticleForm;
