import useSWR from "swr";
import { Link, useParams } from "react-router-dom";
import { Button, Group, Stack, Text } from "@mantine/core";
import { TbArrowLeft } from "react-icons/tb";
// import { faker } from "@faker-js/faker"; // TODO: move to msw

import { getMonthDate } from "@/shared/utils";
import { summaryUrl } from "@/entities/summary";
import { SummaryTable } from "@/widgets/summary-table";
import { SummaryDTO } from "@/entities/summary/dto";

// TODO: move to msw
// function makeData(length: number, date: Date): SummaryRow[] {
//   faker.seed(date.getTime());
//   return new Array(length).fill(null).map((_, idx) => {
//     return {
//       id: idx,
//       idField: faker.string.uuid(),
//       opType: ["withdraw", "deposit"][faker.number.int({ min: 0, max: 1 })],
//       project: faker.science.chemicalElement().name,
//       date: faker.date
//         .between({
//           from: date,
//           to: new Date(date).setMonth(date.getMonth() + 1),
//         })
//         .toLocaleDateString(),
//       amount: Number(faker.finance.amount()),
//       currency: ["RUB", "USD"][faker.number.int({ min: 0, max: 1 })],
//     };
//   });
// }

export function SummaryPage() {
  const params = useParams();
  const date = new Date(params.date!);
  const { data, isLoading } = useSWR<SummaryDTO>(summaryUrl(date));
  console.log(data);

  return (
    <Stack h="100%" pb="md" justify="space-between">
      <SummaryTable loading={isLoading} data={data?.result.data || []} />
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
        {data?.result.total && (
          <Text c="dimmed">
            Загружено {data.result.size} из {data.result.total} строк
          </Text>
        )}
        <Button size="md" disabled={isLoading}>
          Скачать отчет
        </Button>
      </Group>
    </Stack>
  );
}
