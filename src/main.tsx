import "./reset.css";

import { render } from "solid-js/web";
import Layout from "./layout/Layout";
import Card from "./component/Card";

const App = () => {
  return (
    <Layout>
      <Card youtubeId="Cx2dkpBxst8" />
    </Layout>
  );
};

const app = document.getElementById("app");
if (app) {
  render(() => <App />, app);
}
