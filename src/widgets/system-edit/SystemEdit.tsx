import {
  Button,
  Card,
  Center,
  Collapse,
  Divider,
  Group,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";

export function SystemEdit() {
  const [opened1, setOpened1] = useState(false);
  const [opened2, setOpened2] = useState(true);
  const isNew = true;
  const fields = [
    { name: "John Doe", email: "john@mantine.dev" },
    { name: "Bill Love", email: "bill@mantine.dev" },
    { name: "Nancy Eagle", email: "nanacy@mantine.dev" },
    { name: "Lim Notch", email: "lim@mantine.dev" },
    { name: "Susan Seven", email: "susan@mantine.dev" },
  ];

  return (
    <Card h="100%" p={0} withBorder>
      <ScrollArea>
        <Stack px="lg" py="md">
          <Title order={2}>
            {isNew ? "Создание " : "Редактирование "}платежной системы
          </Title>
          <Divider />
          <TextInput label="Название" placeholder="Введите название" />
          <Group pr="xs" justify="space-between" align="end">
            <Title mt="md" order={3} fz="lg">
              Поля файла #1
            </Title>
            <Button
              variant="light"
              size="xs"
              px="sm"
              onClick={() => setOpened1(!opened1)}
            >
              V
            </Button>
          </Group>
          <Collapse in={opened1}>
            {fields.map((_x, idx) => (
              <Group key={idx} mt="xs" grow>
                <TextInput
                  placeholder="John Doe"
                  //   {...form.getInputProps(`employees.${index}.name`)}
                />
                <TextInput
                  placeholder="example@mail.com"
                  // {...form.getInputProps(`employees.${index}.email`)}
                />
              </Group>
            ))}
          </Collapse>
          <Group pr="xs" justify="space-between" align="end">
            <Title mt="md" order={3} fz="lg">
              Поля файла #2
            </Title>
            <Group gap="sm">
              <Button
                variant="light"
                size="xs"
                px="sm"
                onClick={() => setOpened2(!opened2)}
              >
                V
              </Button>
              <Button variant="light" color="red" size="xs" px="sm">
                X
              </Button>
            </Group>
          </Group>
          <Collapse in={opened2}>
            {fields.map((_x, idx) => (
              <Group key={idx} mt="xs" grow>
                <TextInput
                  placeholder="John Doe"
                  //   {...form.getInputProps(`employees.${index}.name`)}
                />
                <TextInput
                  placeholder="example@mail.com"
                  // {...form.getInputProps(`employees.${index}.email`)}
                />
              </Group>
            ))}
          </Collapse>
          <Center my="lg">
            <Button w="50%">Добавить файл</Button>
          </Center>
        </Stack>
      </ScrollArea>
    </Card>
  );
}
