import clsx from "clsx";
import {
  Button,
  Card,
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { PaymentsSystem } from "@/entities/payments-system";
import { Scoreboard } from "@/entities/scoreboard";

import styles from "./system-list.module.css";
import { TbTrash } from "react-icons/tb";

type SystemsListProps = {
  systems: (PaymentsSystem | Scoreboard)[];
  isLoading?: boolean;
  selected?: PaymentsSystem["id"] | "scoreboard" | null;
  onSelect?: (id: PaymentsSystem["id"] | "scoreboard") => void;
  onDelete?: (id: PaymentsSystem["id"]) => void;
};

export function SystemsList({
  systems,
  selected,
  isLoading,
  onSelect = () => {},
  onDelete = () => {},
}: SystemsListProps) {
  return (
    <ScrollArea>
      <Stack pr="1rem">
        {isLoading && (
          <Center mt="1rem">
            <Loader />
          </Center>
        )}
        {!isLoading && (
          <>
            <Card
              className={clsx(styles.systemCard, {
                [styles.active]: "scoreboard" === selected,
              })}
              onClick={() => onSelect("scoreboard")}
            >
              <Group justify="space-between" wrap="nowrap" gap="sm">
                <div>
                  <Text lineClamp={1} component={Title} order={3} fz="xl">
                    Табло
                  </Text>
                  {/* <Text c="dimmed" size="sm">
                      Количество файлов: {s.filesCount}
                    </Text> */}
                </div>
              </Group>
            </Card>
            {(
              systems.filter(
                (s) => !!(s as PaymentsSystem).name
              ) as PaymentsSystem[]
            ).map((s) => (
              <Card
                key={s.id}
                className={clsx(styles.systemCard, {
                  [styles.active]: s.id === selected,
                })}
                onClick={() => onSelect(s.id)}
              >
                <Group justify="space-between" wrap="nowrap" gap="sm">
                  <div>
                    <Text lineClamp={1} component={Title} order={3} fz="xl">
                      {s.name}
                    </Text>
                    <Text c="dimmed" size="sm">
                      Количество файлов: {s.filesCount}
                    </Text>
                  </div>
                  <Button
                    variant="light"
                    color="red"
                    px="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(s.id);
                    }}
                  >
                    <TbTrash size={20} />
                  </Button>
                </Group>
              </Card>
            ))}
          </>
        )}
      </Stack>
    </ScrollArea>
  );
}
