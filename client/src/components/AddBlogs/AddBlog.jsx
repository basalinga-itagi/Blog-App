import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BLOGURL, USERURL } from "../../constants";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddBlog() {
  const location = useLocation();
  console.log("location", location?.pathname.split("/")[2]);
  const editUserId = location?.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`${BLOGURL}/getblog/${editUserId}`);
  console.log("fetch user blog", data);
  const { title, description, image } = data ? data : {};
  const [blogInfo, setBlogInfo] = React.useState({
    title: data ? title : "",
    description: data ? description : "",
    image: data ? image : "",
  });
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit event", blogInfo);
    try {
      const res = await axios.post(`${BLOGURL}/addblog`, {
        title: blogInfo.title,
        description: blogInfo.description,
        image: blogInfo.image,
        user: userId,
      });
      if (res) {
        navigate("/allblogs");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    setBlogInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          marginBottom: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {editUserId ? "Edit" : "Create"} Your Blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            onChange={handleChange}
            value={blogInfo.title}
            label={"Enter Title"}
            name="title"
            autoComplete="title"
            autoFocus
          />
          <TextField
            margin="normal"
            multiline
            rows={6}
            value={blogInfo.description}
            required
            fullWidth
            id="description"
            onChange={handleChange}
            label="Enter description"
            name="description"
            autoComplete="description"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            value={blogInfo.image}
            onChange={handleChange}
            label="Enter Image"
            name="image"
            autoComplete="image"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
