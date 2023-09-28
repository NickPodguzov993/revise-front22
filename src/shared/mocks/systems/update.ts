import { rest } from "msw";
import { updatePaymentsSystemMock } from "./api";

export const systemUpdateHandler = rest.patch(
  "/api/payments-system/:id",
  async (req, res, ctx) => {
    const id = Number(req.params.id);
    const payload = await req.json();
    let system;
    try {
      system = updatePaymentsSystemMock(id, payload);
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
    return res(ctx.status(200), ctx.json(system));
  }
);
