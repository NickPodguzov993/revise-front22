import { useEffect } from "react";
import { useForm } from "@mantine/form";

import { PaymentsSystem } from "@/entities/payments-system";
import {
  Button,
  Divider,
  Group,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { TbPlus, TbTrash, TbX } from "react-icons/tb";

export type SystemsFormValues = Omit<PaymentsSystem, "id">;
type SystemFormProps = {
  target: PaymentsSystem | "new";
  onCancel: () => void;
  onSubmit: (values: SystemsFormValues) => void;
};

export function SystemForm({ target, onSubmit, onCancel }: SystemFormProps) {
  const form = useForm<SystemsFormValues>({
    initialValues: {
      name: "",
      filesCount: 1,
      idField: "",
      opType: "",
      project: "",
      date: "",
      amount: "",
      currency: "",
    },
  });

  useEffect(() => {
    form.reset();
    if (target && target !== "new") {
      form.setValues({ ...target });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  function onAddFile() {
    form.setFieldValue("filesCount", form.values.filesCount + 1);
  }
  function onDeleteFile() {
    form.setFieldValue("filesCount", form.values.filesCount - 1);
  }

  return (
    <form
      style={{ flex: 1, height: "100%" }}
      onSubmit={form.onSubmit(onSubmit)}
    >
      <Stack h="100%" py="md">
        <Group pl="md" justify="space-between">
          <Title order={2} fz="xl">
            {target === "new" ? "Создание" : "Редактирование"} платежной системы
          </Title>

          <Button
            h={40}
            px="md"
            color="white"
            size="xs"
            variant="transparent"
            onClick={onCancel}
          >
            <TbX size={20} />
          </Button>
        </Group>
        <Divider />
        <ScrollArea px="md">
          <Stack pr="md" gap="sm">
            <TextInput
              label="Название"
              placeholder="Введите название"
              required
              {...form.getInputProps("name")}
            />
            <Group pr="xs" justify="space-between" align="end">
              <Title mt="md" order={3} fz="md">
                Количество файлов: {form.values.filesCount}
              </Title>
              {target === "new" && (
                <>
                  <Group gap="xs">
                    <Button
                      variant="light"
                      color="green"
                      size="xs"
                      px="xs"
                      onClick={onAddFile}
                      disabled={form.values.filesCount >= 5}
                    >
                      <TbPlus size={16} />
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      size="xs"
                      px="xs"
                      onClick={onDeleteFile}
                      disabled={form.values.filesCount <= 1}
                    >
                      <TbTrash size={16} />
                    </Button>
                  </Group>
                </>
              )}
            </Group>
            <Title mt="md" order={3} fz="md">
              Колонки в файлах
            </Title>
            <Stack gap={0}>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="id"
                  {...form.getInputProps("idField")}
                />
                <TextInput
                  placeholder="Тип операции"
                  {...form.getInputProps("opType")}
                />
              </Group>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="Проект"
                  {...form.getInputProps("project")}
                />
                <TextInput placeholder="Дата" {...form.getInputProps("date")} />
              </Group>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="Сумма"
                  {...form.getInputProps("amount")}
                />
                <TextInput
                  placeholder="Валюта"
                  {...form.getInputProps("currency")}
                />
              </Group>
            </Stack>
          </Stack>
        </ScrollArea>
        <Divider mt="auto" />
        <Group px="md" justify="center" grow>
          <Button maw="50%" type="submit">
            Сохранить
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
