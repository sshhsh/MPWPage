import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Store } from "./store/store";

const store = new Store();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
