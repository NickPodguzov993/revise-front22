import { useState } from "react";
import { useSWRConfig } from "swr";
import { Card, LoadingOverlay, ScrollArea, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FileWithPath } from "@mantine/dropzone";
import { usePersistedDate } from "@/shared/hooks";
import {
  ReviseFile,
  ReviseObject,
  deleteReviseFile,
  reviseObjectsUrl,
  uploadReviseFile,
} from "@/entities/revise-object";
import { ReviseUpload } from "@/features/revise-upload";

import styles from "./overview-table.module.css";
import { ObjectRow } from "./ObjectRow";

type OverviewTableProps = {
  data: ReviseObject[];
  loading: boolean;
};

export function OverviewTable({ data, loading }: OverviewTableProps) {
  const { mutate } = useSWRConfig();
  const [date] = usePersistedDate();
  const [opened, { open, close }] = useDisclosure(false);
  const [fileId, setFileId] = useState<ReviseFile["id"] | null>(null);

  function onUploadOpen(id: ReviseFile["id"]) {
    setFileId(id);
    open();
  }
  function onUploadClose() {
    setFileId(null);
    close();
  }
  async function onUpload(file: FileWithPath) {
    const buffer = await file.arrayBuffer();
    const res = await uploadReviseFile(fileId!, buffer);
    if (!res.ok) {
      // TODO: handle
    }

    mutate(reviseObjectsUrl(date));
    setFileId(null);
    close();
  }
  async function onDelete(fileId: ReviseFile["id"]) {
    const res = await deleteReviseFile(fileId);
    if (!res.ok) {
      // TODO: handle
    }

    mutate(reviseObjectsUrl(date));
    setFileId(null);
    close();
  }

  const rows = data.length ? (
    data.flatMap((obj) =>
      obj.files.map((_, idx) => (
        <ObjectRow
          key={`${obj.id}-${idx}`}
          obj={obj}
          fileIdx={idx}
          onUpload={onUploadOpen}
          onDelete={onDelete}
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
        <ScrollArea classNames={{ scrollbar: styles.scrollbar }}>
          <Table verticalSpacing="xs">
            <Table.Thead className={styles.header}>
              <Table.Tr>
                <Table.Th>Объект</Table.Th>
                <Table.Th w={{ sm: 240, md: 320, lg: 360 }}>Статус</Table.Th>
                <Table.Th miw={160} w={{ sm: 220, lg: 280 }}>
                  Действия
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
      <ReviseUpload
        fileId={fileId!}
        opened={opened}
        onSuccess={onUpload}
        onClose={onUploadClose}
      />
    </>
  );
}
