import { FileStatus, ReviseObject } from "./model";
import { ReviseListDTO } from "./dto";

export function mapFileStatus(status: "NONE"): FileStatus {
  console.log(status);
  return "empty";
}

export function mapReviseObjects(
  dto: ReviseListDTO | null | undefined
): ReviseObject[] {
  return (
    dto?.result.map((rev) => ({
      id: rev.id,
      name: rev.name,
      files: rev.files.map((file) => ({
        id: file.id,
        status: mapFileStatus(file.status),
        // message: file?.message,
      })),
    })) || []
  );
}
