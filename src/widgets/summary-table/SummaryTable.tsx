import { Card, LoadingOverlay, ScrollArea, Table } from "@mantine/core";

import styles from "./summary-table.module.css";

type SummaryTableProps = {
  data: Record<string, string | number | boolean | null>[];
  loading: boolean;
};

const statusColors = {
  "Нет в ПС": "#FFFF0033",
  'Нет в таблице "Табло"': "#00B0F033",
  "Даты не совпадают": "#D9D9D933",
  "Суммы не совпадают": "#92D05033",
  "Не удалось получить курс валют": "#CC660033",
} as Record<string, string>;

export function SummaryTable({ data, loading }: SummaryTableProps) {
  const columns = Object.keys(data[0] || {});
  const rows = data.length ? (
    data.map((item) => (
      <Table.Tr
        key={item["ID транзакции"] as string}
        style={{
          backgroundColor: statusColors?.[item["Комментарий"] as string],
        }}
      >
        {columns.map((col, idx) => (
          <Table.Td key={idx}>{item[col]}</Table.Td>
        ))}
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
              {columns.map((col) => (
                <Table.Td key={col} className={styles.headerCol}>
                  {col}
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
