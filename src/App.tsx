// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "dayjs/locale/ru";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { OverviewPage } from "./pages/overview";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <DatesProvider settings={{ locale: "ru" }}>
        <OverviewPage />
      </DatesProvider>
    </MantineProvider>
  );
}
