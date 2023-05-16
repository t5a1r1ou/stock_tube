import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./reset.css";
import App from "./App";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => false;
    }
  }
}

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
