import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./reset.css";
import "./style.css";

import App from "./App";
const Main = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const app = document.getElementById("app");
if (app) {
  render(() => <Main />, app);
}
