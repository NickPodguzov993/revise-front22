import { FileStatus } from "./model";

export type ReviseListDTO = {
  result: {
    id: number;
    id_ps: number | null;
    name: string;
    files: {
      id: number;
      file: null;
      status: FileStatus;
    }[];
  }[];
};
