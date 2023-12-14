import {
  Badge,
  Button,
  DefaultMantineColor,
  Group,
  Table,
  Tooltip,
} from "@mantine/core";
import { TbTrash } from "react-icons/tb";
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
  onDelete?: (id: ReviseFile["id"]) => void;
};

export function ObjectRow({
  obj,
  fileIdx = 0,
  onUpload = () => { },
  onDelete = () => { },
}: ObjectRowProps) {
  const filesCount = obj.files.length;
  const file = obj.files[fileIdx];

  return (
    <Table.Tr
      className={
        filesCount > 1 && fileIdx !== filesCount - 1 ? styles.multipleRow : ""
      }
    >
      {fileIdx === 0 && (
        <Table.Td rowSpan={filesCount > 1 ? filesCount : undefined}>
          {obj.name}
        </Table.Td>
      )}
      <Table.Td>
        <Tooltip
          label={file.message}
          disabled={!file.message}
          style={{ textAlign: "center", whiteSpace: "pre-wrap" }}
        >
          <Badge className={styles.badge} color={getBadgeColor(file.status)}>
            {getFileStatusTitle(file.status)}
          </Badge>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          {file.status == "empty" && (
            <Button
              size="xs"
              onClick={() => onUpload(file.id)}>
              Загрузить
            </Button>)}
          {file.status !== "empty" && (
            <Button
              px="xs"
              color="red"
              size="xs"
              title="Удалить"
              onClick={() => onDelete(file.id)}
            >
              <TbTrash size={16} />
            </Button>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

function getBadgeColor(status: FileStatus): DefaultMantineColor {
  switch (status) {
    case FileStatus.Empty:
      return "gray";
    case FileStatus.Uploaded:
      return "green";
    case FileStatus.Error:
      return "red";
    default:
      return "blue";
  }
}
