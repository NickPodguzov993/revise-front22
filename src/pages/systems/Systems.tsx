import { Link } from "react-router-dom";
import { Button, Group, Stack } from "@mantine/core";
import { TbArrowLeft } from "react-icons/tb";
import { SystemsList } from "@/widgets/system-list";
import { SystemEdit } from "@/widgets/system-edit";

export function SystemPage() {
  return (
    <Group h="100%" grow>
      <Stack h="100%" justify="space-between">
        <SystemsList />
        <Group pr="1rem">
          <Button
            size="md"
            component={Link}
            to={"/"}
            styles={{ root: { flex: 1 }, label: { gap: "0.5rem" } }}
          >
            <TbArrowLeft />
            Назад
          </Button>
          <Button size="md" style={{ flex: 2 }}>
            Дублировать прошлый месяц
          </Button>
          <Button size="md" style={{ flex: 1 }}>
            Создать
          </Button>
        </Group>
      </Stack>
      <SystemEdit />
    </Group>
  );
}
