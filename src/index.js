import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";

// Wrap App in StrictMode to trigger additional runtime checks
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
