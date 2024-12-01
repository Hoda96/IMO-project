import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import App from "./App.tsx";
import "./global.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import "@mantine/charts/styles.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
