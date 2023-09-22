import { useState } from "react";
import { Card, ScrollArea, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReviseFile, ReviseObject } from "@/entities/revise-object";
import { ReviseUpload } from "@/features/revise-upload";

import styles from "./overview-table.module.css";
import { ObjectRow } from "./ObjectRow";

type OverviewTableProps = {
  data: ReviseObject[];
};

// TODO: optimize table rerendering
export function OverviewTable({ data }: OverviewTableProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [fileId, setFileId] = useState<ReviseFile["id"] | null>(null);

  const rows = data.flatMap((obj) =>
    obj.files.map((_, idx) => (
      <ObjectRow
        key={`${obj.name}-${idx}`}
        obj={obj}
        fileIdx={idx}
        onUpload={(id) => {
          setFileId(id);
          open();
        }}
      />
    ))
  );

  return (
    <>
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
      <ReviseUpload
        fileId={fileId!}
        opened={opened}
        onSuccess={(files) => {
          console.log(files);
          setFileId(null);
          close();
        }}
        onClose={() => {
          setFileId(null);
          close();
        }}
      />
    </>
  );
}
