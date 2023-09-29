import { rest } from "msw";
import { deleteReviseObjectFileMock } from "./api";

export const objectFileDeleteHandler = rest.delete(
  "/api/revise-object/:id",
  async (req, res, ctx) => {
    const id = Number(req.params.id);
    await deleteReviseObjectFileMock(id);
    return res(ctx.status(204));
  }
);
