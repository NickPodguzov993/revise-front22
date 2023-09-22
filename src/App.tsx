// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "dayjs/locale/ru";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { router } from "@/pages";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <DatesProvider settings={{ locale: "ru" }}>
        <RouterProvider router={router} />
      </DatesProvider>
    </MantineProvider>
  );
}
