import { lazy, useState } from "react";
import { Card, LoadingOverlay, ScrollArea, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReviseFile, ReviseObject } from "@/entities/revise-object";

import styles from "./overview-table.module.css";
import { ObjectRow } from "./ObjectRow";

const ReviseUpload = lazy(() => import("@/features/revise-upload"));

type OverviewTableProps = {
  data: ReviseObject[];
  loading: boolean;
};

export function OverviewTable({ data, loading }: OverviewTableProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [fileId, setFileId] = useState<ReviseFile["id"] | null>(null);

  const rows = data.length ? (
    data.flatMap((obj) =>
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
    )
  ) : (
    <Table.Tr className={styles.noData}>
      <Table.Td colSpan={3}>Нет данных</Table.Td>
    </Table.Tr>
  );

  return (
    <>
      <Card className={styles.container} withBorder>
        <LoadingOverlay visible={loading} />
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
