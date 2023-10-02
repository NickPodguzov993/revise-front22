import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Group, Loader, Stack, Text } from "@mantine/core";
import { TbArrowLeft } from "react-icons/tb";
import { faker } from "@faker-js/faker"; // TODO: move to msw

import { getMonthDate } from "@/shared/utils";
import { SummaryTable } from "@/widgets/summary-table";
import { SummaryRow } from "@/entities/summary";

function makeData(length: number, date: Date): SummaryRow[] {
  // TODO: move to msw
  faker.seed(date.getTime());
  return new Array(length).fill(null).map((_, idx) => {
    return {
      id: idx,
      idField: faker.string.uuid(),
      opType: ["withdraw", "deposit"][faker.number.int({ min: 0, max: 1 })],
      project: faker.science.chemicalElement().name,
      date: faker.date
        .between({
          from: date,
          to: new Date(date).setMonth(date.getMonth() + 1),
        })
        .toLocaleDateString(),
      amount: Number(faker.finance.amount()),
      currency: ["RUB", "USD"][faker.number.int({ min: 0, max: 1 })],
    };
  });
}

export function SummaryPage() {
  const params = useParams();
  const [data, setData] = useState<SummaryRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const date = new Date(params.date!);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(makeData(1000, date));
      setIsProcessing(false);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack h="100%" pb="md" justify="space-between">
      {isProcessing ? (
        <Stack my="auto">
          <Loader style={{ alignSelf: "center" }} />
          <Text ta="center">
            Данные в процесе обработки, пожалуйста подождите
          </Text>
        </Stack>
      ) : (
        <SummaryTable loading={false} data={data} />
      )}
      <Group justify="space-between">
        <Button
          variant="light"
          size="md"
          styles={{ label: { gap: "0.5rem" } }}
          component={Link}
          to={`/?date=${getMonthDate(date)}`}
        >
          <TbArrowLeft />
          Назад
        </Button>
        {!isProcessing && (
          <Text c="dimmed">
            Загружено {~~(data.length / 2)} из {data.length} строк
          </Text>
        )}
        <Button size="md" disabled={isProcessing}>
          Скачать отчет
        </Button>
      </Group>
    </Stack>
  );
}
