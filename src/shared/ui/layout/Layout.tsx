import { Link, Outlet } from "react-router-dom";
import { AppShell, Container, Title } from "@mantine/core";

import styles from "./layout.module.css";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

export function Layout() {
  // const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      className={styles.shell}
      padding="lg"
    >
      <AppShell.Header>
        <Container className={styles.header} size="xl">
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
          <Title className={styles.title} order={1} size={24}>
            <Link to="/">СверОчка</Link>
          </Title>
          <ColorSchemeToggle />
        </Container>
      </AppShell.Header>

      {/* <AppShell.Navbar p="md">Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <Container className={styles.content} size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
