import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, CardMedia } from "@mui/material";
import { red } from "@mui/material/colors";
import CardItem from "../CardItem/CardItem";
import useFetch from "../../hooks/useFetch";
import { BLOGURL } from "../../constants";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import axios from "axios";
import logo from "../../assets/images.jpeg";

export default function Blog({ category }) {
  const [allBlogs, setAllBlogs] = React.useState([]);

  const { data, loading, error } = useFetch(
    `${BLOGURL}/allblogs${category == "" ? "/" : "?" + category}`
  );
  // console.log("allblogs", data);
  React.useEffect(() => {
    setAllBlogs(data);
  }, [data]);

  const handleDelete = async (blogId) => {
    try {
      const res = await axios.delete(`${BLOGURL}/deleteblog/${blogId}`);
      if (res) {
        const filterArr = data.filter(({ _id }) => _id !== blogId);
        setAllBlogs(filterArr);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {data && data.length == 0 && (
        <>
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
            <NewReleasesIcon color="red" />
            No Blogs Found
          </Typography>
        </>
      )}
      <Box
        sx={{
          marginTop: 13,
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {allBlogs &&
          allBlogs.length > 0 &&
          allBlogs.map(
            ({ title, description, image, _id, createdAt, user, tagtype }) => {
              return (
                <CardItem
                  title={title}
                  description={description}
                  blogId={_id}
                  user={user.name}
                  image={image}
                  tagtype={tagtype}
                  createdAt={createdAt}
                  userId={user._id}
                  handleDelete={handleDelete}
                />
              );
            }
          )}
        {/* <Typography>image</Typography>
        <CardMedia
          component="img"
          height="194"
          sx={{ objectFit: "contain" }}
          image={logo}
          alt="Paella dish"
        /> */}
      </Box>
    </>
  );
}
