import cx from "clsx";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { TbSun, TbMoon } from "react-icons/tb";

import styles from "./color-scheme-toggle.module.css";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="2.25rem"
    >
      <TbSun className={cx(styles.icon, styles.light)} />
      <TbMoon className={cx(styles.icon, styles.dark)} />
    </ActionIcon>
  );
}
