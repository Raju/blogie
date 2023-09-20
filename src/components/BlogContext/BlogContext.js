"use client"

import { createContext, useEffect, useContext, useState } from "react";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const updateBlogs = (newBlogs) => {
    setBlogs(newBlogs);
    localStorage.setItem("blogs", JSON.stringify(newBlogs));
  };

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    if (storedBlogs) setBlogs(storedBlogs);
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, updateBlogs }}>
      {children}
    </BlogContext.Provider>
  );
}

const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
}

export {useBlogs};

export default BlogProvider;
