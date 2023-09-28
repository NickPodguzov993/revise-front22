import { rest } from "msw";
import { createPaymentsSystemMock } from "./api";

export const systemCreateHandler = rest.post(
  "/api/payments-system",
  async (req, res, ctx) => {
    const payload = await req.json();
    const system = createPaymentsSystemMock(payload);
    return res(ctx.status(201), ctx.json(system));
  }
);
