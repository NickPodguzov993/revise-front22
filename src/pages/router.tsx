/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader } from "@mantine/core";
import { Layout } from "@/shared/ui";

const HomePage = lazy(() => import("./home"));
const SettingsPage = lazy(() => import("./settings"));
const SummaryPage = lazy(() => import("./summary"));
const LogsPage = lazy(() => import("./logs"));

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
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
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
      {
        path: "/logs",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LogsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
