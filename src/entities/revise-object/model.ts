export type FileStatus = "empty" | "uploaded" | "error";

export type ReviseFile = {
  id: number;
  status: FileStatus;
  message?: string;
};

export type ReviseObject = {
  id: number;
  name: string;
  files: ReviseFile[];
};
