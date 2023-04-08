import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./reset.css";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => false;
    }
  }
}

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
