import { useRef } from "react";
import { Button, Group, Modal, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { ReviseFile } from "@/entities/revise-object";
import { TbDownload, TbX, TbCloudUpload } from "react-icons/tb";

import styles from "./revise-upload.module.css";

type ReviseUploadProps = {
  fileId: ReviseFile["id"];
  opened: boolean;
  onSuccess: (files: FileWithPath) => void;
  onClose: () => void;
};

export function ReviseUpload({
  opened,
  onSuccess,
  onClose,
}: ReviseUploadProps) {
  const openRef = useRef<() => void>(null);

  return (
    <Modal opened={opened} onClose={onClose} title="Загрузка файла" centered>
      <div className={styles.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(files) => onSuccess(files[0])}
          classNames={{
            root: styles.dropzone,
            inner: styles.dropzoneInner,
          }}
          radius="md"
          // accept={[MIME_TYPES.pdf]}
          maxSize={100 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <TbDownload
                  style={{ width: rem(50), height: rem(50) }}
                  // color={theme.colors.blue[6]} 
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <TbX
                  style={{ width: rem(50), height: rem(50) }}
                  // color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <TbCloudUpload
                  style={{ width: rem(50), height: rem(50) }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Отпустите файл здесь</Dropzone.Accept>
              <Dropzone.Reject>Неверный формат</Dropzone.Reject>
              <Dropzone.Idle>Загрузите файл</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Перетащите файл сюда, чтобы загрузить. Принимаются файлы Excel
              формата, размером до 100МБ.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={styles.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Выбрать файл
        </Button>
      </div>
    </Modal>
  );
}
