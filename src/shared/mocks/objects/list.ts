import { rest } from "msw";
import { getMonthDate } from "@/shared/utils";

export const objectsListHandler = rest.get(
  "/api/revise-objects",
  (req, res, ctx) => {
    const date = req.url.searchParams.get("date");
    if (!date) {
      return res(
        ctx.status(400),
        ctx.json({ error: `Query param "date" must be specified` })
      );
    }

    const saved = JSON.parse(
      localStorage.getItem("revise-objects") || getInitialData()
    );

    return res(ctx.status(200), ctx.json(saved[date]));
  }
);

function getInitialData() {
  const initial = JSON.stringify({
    [getMonthDate(new Date())]: [
      { name: "Табло", files: [{ id: 1, status: "uploaded" }] },
      {
        name: "Платежная система #1",
        files: [
          { id: 2, status: "error" },
          { id: 3, status: "empty" },
        ],
      },
      {
        name: "Платежная система #2",
        files: [{ id: 4, status: "uploaded" }],
      },
      { name: "Платежная система #3", files: [{ id: 5, status: "empty" }] },
      { name: "Платежная система #4", files: [{ id: 6, status: "empty" }] },
    ],
  });
  localStorage.setItem("revise-objects", initial);
  return initial;
}
