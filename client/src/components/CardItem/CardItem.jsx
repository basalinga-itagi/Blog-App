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
import { BLOGURL } from "../../constants";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./carditem.css";
import moment from "moment";

const CardItem = ({
  title,
  description,
  image,
  blogId,
  user,
  userId,
  tagtype,
  createdAt,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = async () => {
    setOpen(false);
    handleDelete(blogId);
  };
  console.log("image", image);
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user[0].toUpperCase()}
            </Avatar>
          }
          title={title}
          subheader={moment(createdAt).fromNow()}
        />
        <CardMedia
          component="img"
          height="194"
          sx={{ objectFit: "contain" }}
          image={
            image
              ? image
              : "https://i.gadgets360cdn.com/products/large/vivo-t2-5g-db-709x800-1681200173.jpg?downsize=*:420&output-quality=80"
          }
          alt="Paella dish"
        />
        <CardContent>
          <span className="tag tag-teal">{tagtype}</span>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => console.log("clicked")}
          >
            <FavoriteIcon color="error" />
          </IconButton>
          {userId === localStorage.getItem("userId") && (
            <IconButton
              aria-label="add to favorites"
              onClick={() => setOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {userId === localStorage.getItem("userId") && (
            <IconButton
              aria-label="share"
              onClick={() => navigate(`/addblog/${blogId}`)}
            >
              <EditIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete this blog?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardItem;
