import { Card, ScrollArea, Table } from "@mantine/core";
import { ReviseObject } from "@/entities/revise-object";

import styles from "./overview-table.module.css";
import { ObjectRow } from "./ObjectRow";

type OverviewTableProps = {
  data: ReviseObject[];
};

export function OverviewTable({ data }: OverviewTableProps) {
  const rows = data.flatMap((obj) =>
    obj.files.map((_, idx) => (
      <ObjectRow key={`${obj.name}-${idx}`} obj={obj} fileIdx={idx} />
    ))
  );

  return (
    <Card p={0} withBorder>
      <ScrollArea className={styles.scrollArea}>
        <Table verticalSpacing="xs">
          <Table.Thead className={styles.header}>
            <Table.Tr>
              <Table.Th>Объект</Table.Th>
              <Table.Th w={{ sm: 240, md: 320, lg: 360 }}>Статус</Table.Th>
              <Table.Th w={{ base: 220, lg: 280 }}>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
