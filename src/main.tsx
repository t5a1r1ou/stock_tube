import "./css/reset.css";

import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import Layout from "./layout/Layout";

const App = () => {
  const [count, setCount] = createSignal(0);
  const timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));
  return (
    <Layout>
      <div>{count}</div>
    </Layout>
  );
};

const app = document.getElementById("app");
if (app) {
  render(() => <App />, app);
}
