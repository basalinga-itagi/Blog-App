import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardItem from "../CardItem/CardItem";
import useFetch from "../../hooks/useFetch";
import { BLOGURL } from "../../constants";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Blog() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { data, loading, error } = useFetch(`${BLOGURL}/allblogs`);
  console.log("allblogs", data);
  return (
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
        data.length > 0 &&
        data.map(({ title, description, _id, user }) => {
          return (
            <CardItem
              title={title}
              description={description}
              blogId={_id}
              user={user.name}
              userId={user._id}
            />
          );
        })}
    </Box>
  );
}
