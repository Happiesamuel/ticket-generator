import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import TicketProvider from "./context/TicketContext";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TicketProvider>
      <App />
      <Toaster />
    </TicketProvider>
  </StrictMode>
);
