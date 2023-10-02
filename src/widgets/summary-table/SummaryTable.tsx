import { Card, LoadingOverlay, ScrollArea, Table } from "@mantine/core";
import { SummaryRow } from "@/entities/summary";

import styles from "./summary-table.module.css";

type SummaryTableProps = {
  data: SummaryRow[];
  loading: boolean;
};

const columns = ["id", "Тип операции", "Проект", "Дата", "Сумма", "Валюта"];

export function SummaryTable({ data, loading }: SummaryTableProps) {
  const rows = data.length ? (
    data.map((item) => (
      <Table.Tr key={item.id}>
        <Table.Td>{item.idField}</Table.Td>
        <Table.Td>{item.opType}</Table.Td>
        <Table.Td>{item.project}</Table.Td>
        <Table.Td>{item.date}</Table.Td>
        <Table.Td>{item.amount}</Table.Td>
        <Table.Td>{item.currency}</Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr className={styles.noData}>
      <Table.Td colSpan={columns.length}>Нет данных</Table.Td>
    </Table.Tr>
  );

  return (
    <Card className={styles.container} withBorder>
      <LoadingOverlay visible={loading} />
      <ScrollArea classNames={{ scrollbar: styles.scrollbar }}>
        <Table verticalSpacing="xs" withColumnBorders>
          <Table.Thead className={styles.header}>
            <Table.Tr>
              <Table.Th className={styles.idCol}>id</Table.Th>
              <Table.Th>Тип операции</Table.Th>
              <Table.Th>Проект</Table.Th>
              <Table.Th>Дата</Table.Th>
              <Table.Th>Сумма</Table.Th>
              <Table.Th>Валюта</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
