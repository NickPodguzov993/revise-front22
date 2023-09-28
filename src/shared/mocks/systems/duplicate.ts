import { rest } from "msw";
import { duplicatePaymentsSystemsMock } from "./api";

export const systemsDuplicateHandler = rest.post(
  "/api/payments-system/duplicate",
  async (req, res, ctx) => {
    const payload = await req.json();
    let copiedSystems;
    try {
      copiedSystems = await duplicatePaymentsSystemsMock(payload);
    } catch (err) {
      return res(
        ctx.status(400),
        ctx.json({
          message:
            err instanceof Error
              ? err.message
              : err || "Something went wrong...",
        })
      );
    }
    return res(ctx.status(200), ctx.json(copiedSystems));
  }
);
