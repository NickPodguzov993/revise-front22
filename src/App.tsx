import "dayjs/locale/ru";
import { SWRConfig } from "swr";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import { fetcher } from "@/shared/api";
import { router } from "@/pages";

export default function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <MantineProvider defaultColorScheme="auto">
        <DatesProvider settings={{ locale: "ru" }}>
          <Notifications />
          <RouterProvider router={router} />
        </DatesProvider>
      </MantineProvider>
    </SWRConfig>
  );
}
