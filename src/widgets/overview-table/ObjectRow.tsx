import {
  Badge,
  Button,
  DefaultMantineColor,
  Group,
  Table,
} from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import {
  FileStatus,
  ReviseFile,
  ReviseObject,
  getFileStatusTitle,
} from "@/entities/revise-object";

import styles from "./object-row.module.css";

type ObjectRowProps = {
  obj: ReviseObject;
  fileIdx?: number;
  onUpload?: (id: ReviseFile["id"]) => void;
};

export function ObjectRow({
  obj,
  fileIdx = 0,
  onUpload = () => {},
}: ObjectRowProps) {
  const filesCount = obj.files.length;
  const file = obj.files[fileIdx];

  return (
    <Table.Tr
      className={
        filesCount > 1 && fileIdx !== filesCount - 1 ? styles.multipleRow : ""
      }
    >
      <Table.Td>{fileIdx === 0 && obj.name}</Table.Td>
      <Table.Td>
        <Badge className={styles.badge} color={getBadgeColor(file.status)}>
          {getFileStatusTitle(file.status)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Button size="xs" onClick={() => onUpload(file.id)}>
            Загрузить
          </Button>
          {file.status !== "empty" && (
            <Button px="sm" color="red" size="xs" title="Удалить">
              <FaTrashAlt />
            </Button>
          )}
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
