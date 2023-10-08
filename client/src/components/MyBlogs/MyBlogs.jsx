import React from "react";
import { Box, Typography } from "@mui/material";
import CardItem from "../CardItem/CardItem";
import useFetch from "../../hooks/useFetch";
import { BLOGURL } from "../../constants";
const MyBlogs = () => {
  const userId = localStorage.getItem("userId");
  const { data, loading, error } = useFetch(`${BLOGURL}/user/${userId}`);
  console.log(data);

  return (
    <>
      {data && data.blogs.length == 0 && (
        <Typography
          variant="h1"
          component="h2"
          sx={{
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Blogs Found
        </Typography>
      )}
      <Box
        sx={{
          marginTop: 13,
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          // justifyContent: "space-between",
        }}
      >
        {data &&
          data.blogs.length > 0 &&
          data.blogs.map(({ title, description }) => {
            return (
              <CardItem
                title={title}
                description={description}
                user={data.name}
              />
            );
          })}
      </Box>
    </>
  );
};

export default MyBlogs;
