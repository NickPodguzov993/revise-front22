import "dayjs/locale/ru";
import { SWRConfig } from "swr";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { fetcher } from "@/shared/api";
import { router } from "@/pages";


export default function App() {


  return (
      <div>
          {
                  <SWRConfig value={{ fetcher }}>
                      <MantineProvider defaultColorScheme="auto">
                          <DatesProvider settings={{ locale: "ru" }}>
                              <RouterProvider router={router} />
                          </DatesProvider>
                      </MantineProvider>
                  </SWRConfig>
          }
      </div>
  );
}
