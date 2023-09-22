import { Card, ScrollArea, Table } from "@mantine/core";
import { ReviseObject } from "@/entities/revise-object";

import styles from "./overview-table.module.css";
import { ObjectRow } from "./ObjectRow";

const objects: ReviseObject[] = [
  { name: "Табло", files: [{ status: "uploaded" }] },
  {
    name: "Платежная система #1",
    files: [{ status: "uploaded" }, { status: "error" }],
  },
  { name: "Платежная система #2", files: [{ status: "empty" }] },
  { name: "Платежная система #3", files: [{ status: "uploaded" }] },
  { name: "Платежная система #4", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #5", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #6", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #7", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #8", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #9", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #10", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #11", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #12", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #13", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #14", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #15", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #16", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #17", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #18", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #19", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #20", files: [{ status: "uploaded" }] },
  // { name: "Платежная система #21", files: [{ status: "uploaded" }] },
];

export function OverviewTable() {
  const rows = objects.flatMap((obj) =>
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
              <Table.Th w={360}>Статус</Table.Th>
              <Table.Th w={280}>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
