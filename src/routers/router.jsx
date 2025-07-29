import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";
import TopHeader from "../Pages/HomeComponents/TopHeader";
import ResultCard from "../Pages/HomeComponents/ResultCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "result-card",
        element: <ResultCard></ResultCard>,
      },
    ],
  },
]);

export default router;
