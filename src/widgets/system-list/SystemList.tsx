import cx from "clsx";
import { Card, ScrollArea, Stack, Text, Title } from "@mantine/core";
import styles from "./system-list.module.css";

const data = [
  { id: 0, name: "Платежная система #1", filesCount: 1 },
  { id: 1, name: "Платежная система #2", filesCount: 2 },
  { id: 2, name: "Платежная система #3", filesCount: 1 },
  { id: 3, name: "Платежная система #4", filesCount: 1 },
  // { id: 4, name: "Платежная система #5", filesCount: 1 },
  // { id: 5, name: "Платежная система #6", filesCount: 1 },
  // { id: 6, name: "Платежная система #7", filesCount: 1 },
];

export function SystemsList() {
  const active = 0;
  return (
    <ScrollArea>
      <Stack pr="1rem">
        {data.map((item, idx) => (
          <Card
            key={item.id}
            className={cx(styles.systemCard, {
              [styles.active]: idx === active,
            })}
            onClick={() => {}}
          >
            <Title order={3} fz="xl">
              {item.name}
            </Title>
            <Text c="dimmed" size="sm">
              Количество файлов: {item.filesCount}
            </Text>
          </Card>
        ))}
      </Stack>
    </ScrollArea>
  );
}
