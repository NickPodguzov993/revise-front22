export type FileStatus = "empty" | "uploaded" | "error";

export type ReviseFile = {
  id: number;
  status: FileStatus;
};

export type ReviseObject = {
  name: string;
  files: ReviseFile[];
};
