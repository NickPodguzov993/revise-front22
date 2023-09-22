import { createBrowserRouter } from "react-router-dom";
import { OverviewPage } from "./overview";
import { SummaryPage } from "./summary";
import { SystemsPage } from "./systems";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OverviewPage />,
  },
  {
    path: "/systems",
    element: <SystemsPage />,
  },
  {
    path: "/summary/:date",
    element: <SummaryPage />,
  },
]);
