import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import App from "./App";
import "../scss/master.scss";

createRoot(document.getElementById("root") as Container).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
