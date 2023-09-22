import { createBrowserRouter } from "react-router-dom";
import { OverviewPage } from "./overview";
import { SummaryPage } from "./summary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OverviewPage />,
  },
  {
    path: "/summary/:date",
    element: <SummaryPage />,
  },
]);
