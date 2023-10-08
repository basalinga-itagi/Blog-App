import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";
import useFetch from "../../hooks/useFetch";
import { USERURL } from "../../constants";
import { CardMedia } from "@mui/material";

const settings = ["Profile", "Logout"];

function Header() {
  let myBlogs = 2;
  let favBlogs = 3;
  let login = false;
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const isLogin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { data, loading, error } = useFetch(`${USERURL}/finduser/${userId}`);
  console.log(data);
  const pages = [
    {
      name: "All Blogs",
      url: "/allblogs",
    },
    {
      name: "Add Blogs",
      url: "/addblog",
    },
    {
      name: `My Blogs ${
        data?.blogs?.length > 0 ? `(${data?.blogs?.length})` : ""
      }`,
      url: "/myblogs",
    },
    // {
    //   name: `Faviourate Blogs(${favBlogs})`,
    //   url: "/favblogs",
    // },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    setAnchorElUser(null);
    // dispatch(logout());
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 100%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG APP
          </Typography>
          {/* <CardMedia
            alt="title"
            component="img"
            title="title"
            image={``}
          /> */}
          {/* <img
            src={`https://www.istockphoto.com/photo/a-large-gray-craftsman-new-construction-house-with-a-landscaped-yard-and-leading-gm1448386210-485915364?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&utm_term=image%3A%3A%3A`}
            width={100}
            height={100}
            alt={"My Tech"}
          /> */}

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          {isLogin && (
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "center",
                },
              }}
            >
              {pages.map((page) => (
                <NavLink
                  to={page.url}
                  key={page.name}
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </NavLink>
              ))}
            </Box>
          )}

          {isLogin && (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: 4 }}>
                Welcome{" "}
                {`${data?.name[0]?.toUpperCase()}${data?.name?.substr(
                  1,
                  data?.name?.length
                )}`}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ bgcolor: "white", color: "black" }}
                    aria-label="recipe"
                  >
                    {data?.name[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClick={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting}>
                    <Typography
                      textAlign="center"
                      onClick={setting === "Logout" && handleLogOut}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!isLogin && (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                background:
                  "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
