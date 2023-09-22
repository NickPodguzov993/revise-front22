import { Link, Outlet } from "react-router-dom";
import { AppShell, Group, Title } from "@mantine/core";

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
      px="xs"
    >
      <AppShell.Header className={styles.header}>
        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
        <Group className={styles.headerGroup}>
          <Title className={styles.title} order={1} size={24}>
            <Link to="/">Payments Revise</Link>
          </Title>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      {/* <AppShell.Navbar p="md">Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
