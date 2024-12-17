import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CustomSettingApp from "./custom-settings/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <CustomSettingApp />
  </StrictMode>
);
