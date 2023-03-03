import "./css/reset.css";

import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import html from "solid-js/html";

const App = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));
  return html` <div>${count}</div> `;
};

const app = document.getElementById("app");
if (app) {
  render(() => <App />, app);
}
