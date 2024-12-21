import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CustomSettingApp from "./custom-settings/App";
import AnimatedApp from "./animated/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimatedApp />
    <CustomSettingApp />
  </StrictMode>
);
