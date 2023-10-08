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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const CardItem = ({ title, description, blogId, user, userId }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user}
          </Avatar>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ objectFit: "contain" }}
        image={
          "https://i.gadgets360cdn.com/products/large/vivo-t2-5g-db-709x800-1681200173.jpg?downsize=*:420&output-quality=80"
        }
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => console.log("clicked")}
        >
          <FavoriteIcon />
        </IconButton>
        {userId === localStorage.getItem("userId") && (
          <IconButton aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          aria-label="share"
          onClick={() => navigate(`/addblog/${blogId}`)}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;
