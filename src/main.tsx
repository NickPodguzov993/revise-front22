import "./globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

if (import.meta.env.MODE === "mock") {
  import("@/shared/mocks/browser");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
