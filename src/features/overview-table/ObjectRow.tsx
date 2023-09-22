import {
  Badge,
  Button,
  DefaultMantineColor,
  Group,
  Table,
} from "@mantine/core";
import { FileStatus, ReviseObject } from "@/entities/revise-object";

import styles from "./object-row.module.css";

type ObjectRowProps = {
  obj: ReviseObject;
  fileIdx?: number;
};

export function ObjectRow({ obj, fileIdx = 0 }: ObjectRowProps) {
  const filesCount = obj.files.length;
  return (
    <Table.Tr
      className={
        filesCount > 1 && fileIdx !== filesCount - 1 ? styles.multipleRow : ""
      }
    >
      <Table.Td>{fileIdx === 0 && obj.name}</Table.Td>
      <Table.Td>
        <Badge color={getBadgeColor(obj.files[fileIdx].status)}>
          {obj.files[fileIdx].status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Button size="xs">Загрузить</Button>
          <Button color="red" size="xs">
            X
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

function getBadgeColor(status: FileStatus): DefaultMantineColor {
  switch (status) {
    case "empty":
      return "gray";
    case "uploaded":
      return "green";
    case "error":
      return "red";
    default:
      return "blue";
  }
}
