import { useState } from "react";
import { Button, Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { Layout } from "@/shared/ui";
import { OverviewTable } from "@/features/overview-table";

import styles from "./overview.module.css";

export function OverviewPage() {
  const [month, setMonth] = useState(new Date());

  return (
    <Layout>
      <Stack className={styles.container} gap="lg">
        <Group justify="space-between">
          <MonthPickerInput
            className={styles.datePicker}
            size="md"
            label="Выберите месяц"
            value={month}
            onChange={(date) => setMonth(date as Date)}
          />
          <Button variant="light" size="md">
            Платежные системы
          </Button>
        </Group>
        <OverviewTable />
        <Group justify="end">
          <Button size="md">Рассчитать</Button>
        </Group>
      </Stack>
    </Layout>
  );
}
