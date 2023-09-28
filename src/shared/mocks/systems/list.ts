import { rest } from "msw";
import { getPaymentsSystemsMock } from "./api";

export const systemsListHandler = rest.get(
  "/api/payments-system",
  (req, res, ctx) => {
    const date = req.url.searchParams.get("date");
    if (!date) {
      return res(
        ctx.status(400),
        ctx.json({ error: `Query param "date" must be specified` })
      );
    }

    const systems = getPaymentsSystemsMock(date);

    return res(ctx.status(200), ctx.json(systems));
  }
);
