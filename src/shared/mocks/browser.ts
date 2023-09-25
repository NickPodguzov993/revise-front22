import { setupWorker } from "msw";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);
worker.start({
  onUnhandledRequest({ method, url }) {
    if (url.pathname.startsWith("/api")) {
      throw new Error(`Unhandled ${method} request to ${url}`);
    }
  },
});
