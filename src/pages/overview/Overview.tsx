import useSWR from "swr";
import { Link } from "react-router-dom";
import { Button, Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

import { getMonthDate } from "@/shared/utils";
import { usePersistedDate } from "@/shared/hooks";
import { ReviseObject, reviseObjectsUrl } from "@/entities/revise-object";
import { OverviewTable } from "@/widgets/overview-table";

import styles from "./overview.module.css";

export function OverviewPage() {
  const [date, setDate] = usePersistedDate();
  const { data, isLoading } = useSWR<ReviseObject[]>(reviseObjectsUrl(date));

  return (
    <Stack className={styles.container} gap="lg">
      <Group justify="space-between" align="end">
        <MonthPickerInput
          className={styles.datePicker}
          size="md"
          label="Месяц сверки"
          value={date}
          onChange={setDate}
        />
        <Button
          variant="light"
          size="md"
          component={Link}
          to={`/systems?date=${getMonthDate(date)}`}
        >
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
