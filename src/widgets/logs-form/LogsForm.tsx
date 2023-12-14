import { Button, FileInput, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { LogsFormValues } from "@/entities/logs";

type SystemFormProps = {
  onSubmit: (values: LogsFormValues) => void;
};
export function LogsForm({ onSubmit }: SystemFormProps) {
  const form = useForm<LogsFormValues>({
    initialValues: {
      userId: "user_id",
      date: "datetime",
      sum: "amount_currency",
      fileLog: null!,
      fileMarbella: null!,
    },
    validate: {
      userId: (v) => !v,
      date: (v) => !v,
      sum: (v) => !v,
      fileLog: (v) => !v,
      fileMarbella: (v) => !v,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="lg" align="center">
        <Group gap="lg">
          <Stack gap="xl">
            <FileInput
              w={250}
              label="Файл лога"
              placeholder="Выберите файл"
              size="md"
              {...form.getInputProps("fileLog")}
            />
            <FileInput
              w={250}
              label="Файл табло"
              placeholder="Выберите файл"
              size="md"
              {...form.getInputProps("fileMarbella")}
            />
          </Stack>
          <Stack>
            <TextInput
              label="Имена полей"
              placeholder="user_id"
              {...form.getInputProps("userId")}
            />
            <TextInput placeholder="date" {...form.getInputProps("date")} />
            <TextInput placeholder="sum" {...form.getInputProps("sum")} />
          </Stack>
        </Group>
        <Button type="submit" w="25%">
          Download
        </Button>
      </Stack>
    </form>
  );
}
