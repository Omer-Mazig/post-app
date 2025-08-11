import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "./lib/query-client.ts";
import { App } from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientInstance}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
