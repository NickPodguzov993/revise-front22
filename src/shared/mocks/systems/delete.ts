import { rest } from "msw";
import { deletePaymentsSystemMock } from "./api";

export const systemDeleteHandler = rest.delete(
  "/api/payments-system/:id",
  async (req, res, ctx) => {
    const id = Number(req.params.id);
    await deletePaymentsSystemMock(id);
    return res(ctx.status(204));
  }
);
