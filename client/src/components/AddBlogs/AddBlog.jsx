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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
  const editUserId = location?.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`${BLOGURL}/getblog/${editUserId}`);
  const { title, description, image } = data ? data : {};
  console.log("fetch user user user blog", title, description, image);

  const [blogInfo, setBlogInfo] = React.useState({
    title: "",
    description: "",
    image: "",
  });

  React.useEffect(() => {
    setBlogInfo((prevInfo) => {
      return {
        ...prevInfo,
        title: title,
        description: description,
        image: image,
      };
    });
  }, [data]);
  console.log("Updated blog info", blogInfo);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res;
      if (!editUserId) {
        res = await axios.post(`${BLOGURL}/addblog`, {
          title: blogInfo.title,
          description: blogInfo.description,
          image: blogInfo.image,
          user: userId,
        });
      } else {
        res = await axios.put(`${BLOGURL}/updateblog/${editUserId}`, {
          title: blogInfo.title,
          description: blogInfo.description,
          image: blogInfo.image,
        });
      }

      if (res) {
        navigate("/allblogs");

        // return (
        //   <Alert severity="success">
        //     <AlertTitle>Success</AlertTitle>
        //     This is a success alert — <strong>check it out!</strong>
        //   </Alert>
        // );
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
            {editUserId ? `Update` : `Add`} Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
