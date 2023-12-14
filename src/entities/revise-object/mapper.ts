import { ReviseObject } from "./model";
import { ReviseListDTO } from "./dto";

export function mapReviseObjects(
  dto: ReviseListDTO | null | undefined
): ReviseObject[] {
  return (
    dto?.result.map((rev) => ({
      id: rev.id,
      name: rev.name,
      files: rev.files.map((file) => ({
        id: file.id,
        status: file.status,
        // message: file?.message,
      })),
    })) || []
  );
}
