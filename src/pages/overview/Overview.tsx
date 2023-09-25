import useSWR from "swr";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

import { ReviseObject, getShortDate } from "@/entities/revise-object";
import { OverviewTable } from "@/widgets/overview-table";

import styles from "./overview.module.css";

export function OverviewPage() {
  const [params, setParams] = useSearchParams({
    date: getShortDate(new Date()),
  });
  const [date, setDate] = useState(new Date(params.get("date")!));
  const { data, isLoading } = useSWR<ReviseObject[]>(
    `/api/revise-objects?date=${getShortDate(date)}`
  );

  return (
    <Stack className={styles.container} gap="lg">
      <Group justify="space-between">
        <MonthPickerInput
          className={styles.datePicker}
          size="md"
          label="Месяц сверки"
          value={date}
          onChange={(date: Date) => {
            setDate(date);
            setParams({ date: getShortDate(date) });
          }}
        />
        <Button variant="light" size="md" component={Link} to="/systems">
          Платежные системы
        </Button>
      </Group>
      <OverviewTable data={data || []} loading={isLoading} />
      <Group justify="end">
        <Button
          size="md"
          component={Link}
          to={`/summary/${getShortDate(date)}`}
        >
          Рассчитать
        </Button>
      </Group>
    </Stack>
  );
}
