import { PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";

import styles from "./layout.module.css";

export function Layout({ children }: PropsWithChildren) {
  // const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      // header={{ height: 60 }}
      // navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      className={styles.shell}
      padding="lg"
      px="xs"
    >
      {/* <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar> */}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
