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

import styles from "./system-list.module.css";
import { TbTrash } from "react-icons/tb";

type SystemsListProps = {
  systems: PaymentsSystem[];
  isLoading?: boolean;
  selected?: PaymentsSystem["id"] | null;
  onSelect?: (id: PaymentsSystem["id"]) => void;
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
        {!isLoading && !systems.length && (
          <Card mt="0.5rem" py="lg" ta="center">
            <Text>Не найдено платежных систем</Text>
          </Card>
        )}
        {!isLoading &&
          systems.map((s) => (
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
                    Количество файлов: {s.files.length}
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
      </Stack>
    </ScrollArea>
  );
}
