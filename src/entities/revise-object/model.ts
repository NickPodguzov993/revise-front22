export type FileStatus = "empty" | "uploaded" | "error";

export type ReviseObjectFile = {
  status: FileStatus;
};

export type ReviseObject = {
  name: string;
  files: ReviseObjectFile[];
};
