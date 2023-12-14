import { useEffect } from "react";
import {
  Button,
  Divider,
  Group,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TbX } from "react-icons/tb";

import { Scoreboard } from "@/entities/scoreboard";

export type ScoreboardFormValues = Scoreboard;
type ScoreboardFormProps = {
  target: Scoreboard;
  onCancel: () => void;
  onSubmit: (values: ScoreboardFormValues) => void;
};

export function ScoreboardForm({
  target,
  onSubmit,
  onCancel,
}: ScoreboardFormProps) {
  const form = useForm<ScoreboardFormValues>({
    initialValues: {
      marbellaId: "marbella_id",
      weekOfDate: "Week of Date",
      system: "SYSTEM",
      project: "project",
      country: "country",
      currency: "currency",
      date: "Date",
      playerId: "playerID",
      amountCurrency: "amount_currency",
      amountUsd: "amount_usd",
      type: "TYPE",
      errorDescription: "error_description",
    },
  });

  useEffect(() => {
    form.reset();
    if (target) {
      form.setValues({ ...target });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <form
      style={{ flex: 1, height: "100%" }}
      onSubmit={form.onSubmit(onSubmit)}
    >
      <Stack h="100%" py="md">
        <Group pl="md" justify="space-between">
          <Title order={2} fz="xl">
            Редактирование объекта "Табло"
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
            <Title mt="md" order={3} fz="md">
              Колонки в файле
            </Title>
            <Stack gap={0}>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="marbella_id"
                  {...form.getInputProps("marbellaId")}
                />
                <TextInput
                  placeholder="week_of_date"
                  {...form.getInputProps("weekOfDate")}
                />
              </Group>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="SYSTEM"
                  {...form.getInputProps("system")}
                />
                <TextInput
                  placeholder="project"
                  {...form.getInputProps("project")}
                />
              </Group>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="country"
                  {...form.getInputProps("country")}
                />
                <TextInput
                  placeholder="currency"
                  {...form.getInputProps("currency")}
                />
              </Group>
              <Group mt="xs" grow>
                <TextInput placeholder="date" {...form.getInputProps("date")} />
                <TextInput
                  placeholder="player_id"
                  {...form.getInputProps("playerId")}
                />
              </Group>
              <Group mt="xs" grow>
                <TextInput
                  placeholder="amount_currency"
                  {...form.getInputProps("amountCurrency")}
                />
                <TextInput
                  placeholder="amount_usd"
                  {...form.getInputProps("amountUsd")}
                />
              </Group>
              <Group mt="xs" grow>
                <TextInput placeholder="TYPE" {...form.getInputProps("type")} />
                <TextInput
                  placeholder="error_description"
                  {...form.getInputProps("errorDescription")}
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
