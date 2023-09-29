import { rest } from "msw";
import { uploadReviseObjectFileMock } from "./api";

export const objectFileUploadHandler = rest.post(
  "/api/revise-object/:fileId",
  async (req, res, ctx) => {
    const id = Number(req.params.fileId);
    const object = await uploadReviseObjectFileMock(id);
    return res(ctx.status(200), ctx.json(object));
  }
);
