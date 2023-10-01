import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Center,
  Collapse,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TbChevronDown, TbTrash } from "react-icons/tb";

import { PaymentsSystem, SystemFormValues } from "@/entities/payments-system";

import styles from "./system-form.module.css";

type SystemFormProps = {
  target?: PaymentsSystem | "new" | null;
  onCancel?: () => void;
  onSubmit?: (values: SystemFormValues) => void;
};

function makeFile() {
  return {
    idField: "",
    opType: "",
    project: "",
    date: "",
    sum: "",
    currency: "",
  };
}

export function SystemForm({
  target,
  onCancel = () => {},
  onSubmit = () => {},
}: SystemFormProps) {
  const [states, setStates] = useState([true]);
  const form = useForm<SystemFormValues>({
    initialValues: {
      name: "",
      files: [makeFile()],
    },
  });

  useEffect(() => {
    form.reset();
    if (target && target !== "new") {
      form.setValues(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  function onAddFile() {
    setStates((prev) => [...prev, true]);
    form.insertListItem("files", makeFile());
  }
  function toggleVisibility(idx: number) {
    setStates((prev) => [
      ...prev.slice(0, idx),
      !prev[idx],
      ...prev.slice(idx + 1),
    ]);
  }
  function deleteFile(idx: number) {
    form.removeListItem("files", idx);
  }

  return (
    <Card h="100%" p={0} withBorder>
      {!target ? (
        <Center h="100%">
          <Text maw={250} ta="center">
            Выберите платежную систему или создайте новую
          </Text>
        </Center>
      ) : (
        <form
          style={{ flex: 1, height: "100%" }}
          onSubmit={form.onSubmit(onSubmit)}
        >
          <Stack h="100%" p="md">
            <Title order={2} fz="xl">
              {target === "new" ? "Создание" : "Редактирование"} платежной
              системы
            </Title>
            <Divider />
            <ScrollArea>
              <Stack pr="md" gap="sm">
                <TextInput
                  label="Название"
                  placeholder="Введите название"
                  required
                  {...form.getInputProps("name")}
                />
                {form.values.files.map((_, idx) => (
                  <Fragment key={idx}>
                    <Group pr="xs" justify="space-between" align="end">
                      <Title mt="md" order={3} fz="md">
                        Поля файла #{idx + 1}
                      </Title>
                      <Group gap="xs">
                        <Button
                          className={clsx(styles.fileExpand, {
                            [styles.fileOpened]: states[idx],
                          })}
                          variant="light"
                          size="xs"
                          px="xs"
                          onClick={() => toggleVisibility(idx)}
                        >
                          <TbChevronDown size={16} />
                        </Button>
                        {form.values.files.length > 1 && (
                          <Button
                            variant="light"
                            color="red"
                            size="xs"
                            px="xs"
                            onClick={() => deleteFile(idx)}
                          >
                            <TbTrash size={16} />
                          </Button>
                        )}
                      </Group>
                    </Group>
                    <Collapse in={states[idx]}>
                      <Group mt="xs" grow>
                        <TextInput value="id" readOnly />
                        <TextInput
                          placeholder="(без изменений)"
                          {...form.getInputProps(`files.${idx}.id`)}
                        />
                      </Group>
                      <Group mt="xs" grow>
                        <TextInput value="Тип операции" readOnly />
                        <TextInput
                          placeholder="(без изменений)"
                          {...form.getInputProps(`files.${idx}.opType`)}
                        />
                      </Group>
                      <Group mt="xs" grow>
                        <TextInput value="Проект" readOnly />
                        <TextInput
                          placeholder="(без изменений)"
                          {...form.getInputProps(`files.${idx}.project`)}
                        />
                      </Group>
                      <Group mt="xs" grow>
                        <TextInput value="Дата" readOnly />
                        <TextInput
                          placeholder="(без изменений)"
                          {...form.getInputProps(`files.${idx}.date`)}
                        />
                      </Group>
                      <Group mt="xs" grow>
                        <TextInput value="Сумма" readOnly />
                        <TextInput
                          placeholder="(без изменений)"
                          {...form.getInputProps(`files.${idx}.sum`)}
                        />
                      </Group>
                      <Group mt="xs" grow>
                        <TextInput value="Валюта" readOnly />
                        <TextInput
                          placeholder="(без изменений)"
                          {...form.getInputProps(`files.${idx}.currency`)}
                        />
                      </Group>
                    </Collapse>
                  </Fragment>
                ))}
                <Center my="lg">
                  <Button w="50%" onClick={onAddFile}>
                    Добавить файл
                  </Button>
                </Center>
              </Stack>
            </ScrollArea>
            <Divider mt="auto" />
            <Group grow>
              <Button color="red" onClick={onCancel}>
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </Group>
          </Stack>
        </form>
      )}
    </Card>
  );
}
