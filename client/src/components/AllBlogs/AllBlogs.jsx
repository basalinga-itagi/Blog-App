import React, { useState } from "react";
import Blog from "../Blog/Blog";
import BlogCategory from "./BlogCategory";
import { Typography } from "@mui/material";

const AllBlogs = () => {
  const [str, setStr] = useState("");
  const getCategoryString = (category) => {
    setStr(category);
  };
  return (
    <div style={{ display: "flex", rowGap: 30 }}>
      <BlogCategory getCategoryString={getCategoryString} />
      <Blog category={str} />
    </div>
  );
};

export default AllBlogs;
