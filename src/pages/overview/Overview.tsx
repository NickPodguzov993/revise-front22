import useSWR from "swr";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

import { getMonthDate } from "@/shared/utils";
import { ReviseObject, reviseObjectsUrl } from "@/entities/revise-object";
import { OverviewTable } from "@/widgets/overview-table";

import styles from "./overview.module.css";

export function OverviewPage() {
  const [params, setParams] = useSearchParams({
    date: getMonthDate(new Date()),
  });
  const [date, setDate] = useState(new Date(params.get("date")!));
  const { data, isLoading } = useSWR<ReviseObject[]>(reviseObjectsUrl(date));

  function onDateChange(date: Date) {
    setDate(date);
    setParams({ date: getMonthDate(date) });
  }

  return (
    <Stack className={styles.container} gap="lg">
      <Group justify="space-between">
        <MonthPickerInput
          className={styles.datePicker}
          size="md"
          label="Месяц сверки"
          value={date}
          onChange={onDateChange}
        />
        <Button variant="light" size="sm" component={Link} to="/systems">
          Платежные системы
        </Button>
      </Group>
      <OverviewTable data={data || []} loading={isLoading} />
      <Group justify="end">
        <Button
          size="md"
          component={Link}
          to={`/summary/${getMonthDate(date)}`}
        >
          Рассчитать
        </Button>
      </Group>
    </Stack>
  );
}
