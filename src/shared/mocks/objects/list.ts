import { rest } from "msw";
import { getReviseObjectsMock } from "./api";

export const objectsListHandler = rest.get(
  "/api/revise-object",
  (req, res, ctx) => {
    const date = req.url.searchParams.get("date");
    if (!date) {
      return res(
        ctx.status(400),
        ctx.json({ error: `Query param "date" must be specified` })
      );
    }

    const objects = getReviseObjectsMock(date);
    return res(ctx.status(200), ctx.json(objects));
  }
);
