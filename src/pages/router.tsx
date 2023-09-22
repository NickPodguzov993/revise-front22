/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader } from "@mantine/core";
import { Layout } from "@/shared/ui";

const OverviewPage = lazy(() => import("./overview"));
const SystemsPage = lazy(() => import("./systems"));
const SummaryPage = lazy(() => import("./summary"));

function PageLoader() {
  return <Loader style={{ alignSelf: "center" }} />;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OverviewPage />
          </Suspense>
        ),
      },
      {
        path: "/systems",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SystemsPage />
          </Suspense>
        ),
      },
      {
        path: "/summary/:date",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SummaryPage />
          </Suspense>
        ),
      },
    ],
  },
]);
