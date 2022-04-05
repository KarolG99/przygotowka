import React from "react";
import "./index.css";
import App from "./views/App";
import { createRoot } from "react-dom/client";

const container: any = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
