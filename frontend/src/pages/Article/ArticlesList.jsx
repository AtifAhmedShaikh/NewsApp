import React, { useEffect, useState } from "react";
import Container from "../../containers/Container";
import BottomBar from "../../components/Navbar/BottomBar";
import ArticleCard from "../../components/Cards/ArticleCard";
import BackBar from "../../components/Navbar/BackBar";
import Loader from "../../components/UI/Loader";
import { fetchArticles } from "../../api/articles";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "../../components/UI/button";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchArticles();
      if (!response) return;
      setArticles(response.data.articles);
      console.log(response);
      setLoading(false);
    })();
  }, []);
  const filteredArticles = articles?.filter(
    (article) =>
      article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      article?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  const sortArticles = (order) => {
    const sortedArticles = [...filteredArticles].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      console.log(sortBy);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });

    setSortBy(order);
    setArticles(sortedArticles);
  };
  return (
    <React.Fragment>
      <Navbar />
      <BackBar pageLabel={"Articles"} />
      <div className="font-sans text-black sm:px-10 mt-4 bg-background w-screen flex items-center justify-center">
        <div className="border rounded overflow-hidden flex justify-between inherit" style={{ width: "inherit" }}>
          <input type="text" className="px-3 bg-inherit py-2 w-[100%] text-foreground" placeholder="Search..." />
          <button className="flex items-center justify-center px-4 border-l bg-secondary text-foreground">
            <svg className="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-start ml-5 gap-3 mt-3">
        <Button variant={"secondary"} className="px-2 py-2" onClick={() => sortArticles("latest")}>
          Latest News
        </Button>
        <Button variant={"secondary"} className="px-2 py-2" onClick={() => sortArticles("oldest")}>
          Oldest News
        </Button>
      </div>
      <Container className="flex justify-center items-start md:flex-wrap sm:flex-wrap flex-wrap gap-5">
        {loading && <Loader />}
        {!loading && searchQuery && filteredArticles.length === 0 && <p>articles not found from ` {searchQuery} `</p>}
        {filteredArticles?.map((article) => {
          return <ArticleCard key={article?._id} {...article} />;
        })}
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default Articles;
