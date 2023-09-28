import { systemsListHandler } from "./list";
import { systemCreateHandler } from "./create";
import { systemUpdateHandler } from "./update";
import { systemDeleteHandler } from "./delete";
import { systemsDuplicateHandler } from "./duplicate";

export default [
  systemsListHandler,
  systemCreateHandler,
  systemUpdateHandler,
  systemDeleteHandler,
  systemsDuplicateHandler,
];
