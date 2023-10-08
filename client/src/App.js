// import "./App.css";
import Button from "@mui/material/Button";
import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import { router } from "./Router/route";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
