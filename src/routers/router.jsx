import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";
import ResultCard from "../Pages/HomeComponents/ResultCard";
import ReportCardPDF from "../Pages/ReportCardPDF";

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
      {
        path: "result-card1",
        element: <ReportCardPDF></ReportCardPDF>,
      },
    ],
  },
]);

export default router;
