import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Wrap App in StrictMode to trigger additional runtime checks
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
