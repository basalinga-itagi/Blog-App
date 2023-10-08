import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Blog from "../components/Blog/Blog";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import AllBlogs from "../components/AllBlogs/AllBlogs";
import MyBlogs from "../components/MyBlogs/MyBlogs";
import AddBlog from "../components/AddBlogs/AddBlog";
import FavBlogs from "../components/FavBlogs/FavBlogs";
import Footer from "../components/Footer/Footer";
import SignUp from "../components/SignUp/SignUp";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Blog />,
      },
      {
        path: "/addblog/:id?",
        element: <AddBlog />,
      },
      {
        path: "/allblogs",
        element: <AllBlogs />,
      },
      {
        path: "/myblogs",
        element: <MyBlogs />,
      },
      {
        path: "/favblogs",
        element: <FavBlogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
